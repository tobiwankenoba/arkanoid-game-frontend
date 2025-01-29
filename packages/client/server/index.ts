import fs from 'fs/promises'
import path from 'path'
import { fileURLToPath } from 'url'

import { EmotionCache } from '@emotion/react'
import {
  constructStyleTagsFromChunks,
  extractCriticalToChunks,
} from '@emotion/server'
import createEmotionServer from '@emotion/server/create-instance'
import cookieParser from 'cookie-parser'
import dotenv from 'dotenv'
import express, { Request as ExpressRequest } from 'express'
import serialize from 'serialize-javascript'
import { createServer as createViteServer, ViteDevServer } from 'vite'

dotenv.config()
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const port = process.env.PORT || 3000
const clientPath = path.join(__dirname, '..')
const isDev = process.env.NODE_ENV === 'development'

async function createServer() {
  const app = express()
  app.use(cookieParser())

  let vite: ViteDevServer | undefined
  if (isDev) {
    vite = await createViteServer({
      server: { middlewareMode: true },
      root: clientPath,
      appType: 'custom',
    })

    app.use(vite.middlewares)
  } else {
    app.use(
      express.static(path.join(clientPath, 'dist/client'), { index: false })
    )
  }

  app.get('*', async (req, res, next) => {
    const url = req.originalUrl
    try {
      let render: (
        req: ExpressRequest
      ) => Promise<{ html: string; initialState: unknown; cache: EmotionCache }>
      let template: string
      if (vite) {
        template = await fs.readFile(
          path.resolve(clientPath, 'index.html'),
          'utf-8'
        )

        template = await vite.transformIndexHtml(url, template)

        render = (
          await vite.ssrLoadModule(
            path.join(clientPath, 'src/entry-server.tsx')
          )
        ).render
      } else {
        template = await fs.readFile(
          path.join(clientPath, 'dist/client/index.html'),
          'utf-8'
        )

        const pathToServer = path.join(
          clientPath,
          'dist/server/entry-server.js'
        )

        render = (await import(pathToServer)).render
      }

      const { html: appHtml, initialState, cache } = await render(req)

      const { extractCriticalToChunks, constructStyleTagsFromChunks } =
        createEmotionServer(cache)
      const chunks = extractCriticalToChunks(appHtml)
      const styles = constructStyleTagsFromChunks(chunks)

      const html = template
        .replace(`<!--ssr-styles-->`, styles)
        .replace(`<!--ssr-outlet-->`, appHtml)
        .replace(
          `<!--ssr-initial-state-->`,
          `<script>window.APP_INITIAL_STATE = ${serialize(initialState, {
            isJSON: true,
          })}</script>`
        )

      res.status(200).set({ 'Content-Type': 'text/html' }).end(html)
    } catch (e) {
      vite?.ssrFixStacktrace(e as Error)
      next(e)
    }
  })

  app.listen(port, () => {
    console.log(`Client is listening on port: ${port}`)
  })
}

createServer()
