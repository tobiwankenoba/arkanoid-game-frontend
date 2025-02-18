import dotenv from 'dotenv'
import cors from 'cors'
import { authenticateUser } from './middlewares/authMiddleware'
import router from './routes/index'
dotenv.config()

import express from 'express'
// import { createClientAndConnect } from './db'
import { dbConnect } from './init'

dbConnect()

const app = express()
app.use(cors())
app.use(express.json())
app.use(authenticateUser)
app.use('/api', router)
// app.use('/api', userRoutes)
// app.use('/api', commentRoutes)

const port = Number(process.env.SERVER_PORT) || 3001

app.get('/', (_, res) => {
  res.json('👋 Howdy from the server :)')
})

app.listen(port, () => {
  console.log(`  ➜ 🎸 Server is listening on port: ${port}`)
})
