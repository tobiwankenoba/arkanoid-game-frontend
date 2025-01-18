import { CssBaseline } from '@mui/material'
import React from 'react'
import ReactDOM from 'react-dom/client'

import SSRComponent from '@/SSRComponent'

import './index.css'

ReactDOM.hydrateRoot(
  document.getElementById('root') as HTMLElement,
  <React.StrictMode>
    <CssBaseline />
    <SSRComponent />
    {/*<App />*/}
  </React.StrictMode>
)
