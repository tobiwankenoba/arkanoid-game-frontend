import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

import { ROUTES } from '@/constants/routes'
import { selectUser } from '@/selectors'

interface IPrivateRouteProps {
  children: React.ReactNode
}

export const PrivateRoute: React.FC<IPrivateRouteProps> = ({ children }) => {
  const user = useSelector(selectUser)
  //user
  if (user?.user === null) {
    return <Navigate to={ROUTES.login} replace />
  }

  return <>{children}</>
}
