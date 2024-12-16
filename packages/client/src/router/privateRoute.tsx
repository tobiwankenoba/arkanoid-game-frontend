import React from 'react'
import { Navigate } from 'react-router-dom'

import { ROUTES } from '@/constants/routes'
import { useAuthStatus } from '@/hooks/useAuthStatus'

interface IPrivateRouteProps {
  children: React.ReactNode
}

export const PrivateRoute: React.FC<IPrivateRouteProps> = ({ children }) => {
  const isAuthenticated = useAuthStatus()
  console.log(isAuthenticated)

  if (!isAuthenticated) {
    return <Navigate to={ROUTES.login} replace />
  }

  return <>{children}</>
}
