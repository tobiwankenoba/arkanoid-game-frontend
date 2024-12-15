import { useEffect } from 'react'
import { RouterProvider } from 'react-router-dom'

import './App.css'
import { registerSW } from '../public/registerSW'

import { router } from './router/router'

function App() {
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
      <RouterProvider router={router} />
    </div>
  )
}

export default App
