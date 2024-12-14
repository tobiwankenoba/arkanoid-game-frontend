import { useState, useEffect } from 'react'

export const useAuthStatus = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    const token = sessionStorage.getItem('token')
    setIsAuthenticated(!!token)
  }, [])

  return isAuthenticated
}
