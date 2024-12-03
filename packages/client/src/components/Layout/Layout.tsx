import React from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import { Outlet } from 'react-router-dom'

import { Header } from '@/components/Header'
import { ErrorPage } from '@/pages/ErrorPage'

export const Layout = () => {
  return (
    <ErrorBoundary fallback={<ErrorPage />}>
      <Header />
      <Outlet />
    </ErrorBoundary>
  )
}
