import React from 'react'
import { Navigate } from 'react-router-dom'

import { ROUTES } from '@/constants/routes'

interface IPrivateRouteProps {
  children: React.ReactNode
}

export const PrivateRoute: React.FC<IPrivateRouteProps> = ({ children }) => {
  const isAuthenticated = localStorage.getItem('token')

  if (!isAuthenticated) {
    return <Navigate to={ROUTES.login} replace />
  }

  return <>{children}</>
}
