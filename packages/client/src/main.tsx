import createCache from '@emotion/cache'
import { CacheProvider } from '@emotion/react'
import { CssBaseline } from '@mui/material'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { RouterProvider } from 'react-router-dom'

import { router } from './router/router'
import { createReduxStore } from './utils/redux'

import './index.css'

const store = createReduxStore()
const styleCache = createCache({ key: 'custom' })

ReactDOM.hydrateRoot(
  document.getElementById('root') as HTMLElement,
  // <React.StrictMode>
  <CacheProvider value={styleCache}>
    <CssBaseline />
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </CacheProvider>
  // </React.StrictMode>
)
