import { useEffect } from 'react'
import { Provider as ReduxProvider } from 'react-redux'
import { RouterProvider } from 'react-router-dom'

import './App.css'
import { registerSW } from '../public/registerSW'

import { router } from './router/router'
import { createReduxStore } from './utils/redux'

function App() {
  const store = createReduxStore()

  useEffect(() => {
    window.addEventListener('load', registerSW)

    return () => {
      window.removeEventListener('load', registerSW)
    }
  }, [])

  useEffect(() => {
    const fetchServerData = async () => {
      const url = `http://localhost:${__SERVER_PORT__}`
      const response = await fetch(url)
      const data = await response.json()
      console.log(data)
    }

    fetchServerData()
  }, [])

  return (
    <div className="App">
      <ReduxProvider store={store}>
        <RouterProvider router={router} />
      </ReduxProvider>
    </div>
  )
}

export default App
