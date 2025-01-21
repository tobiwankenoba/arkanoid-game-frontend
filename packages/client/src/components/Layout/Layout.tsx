import React, { useEffect } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import { useDispatch } from 'react-redux'
import { Outlet } from 'react-router-dom'

import { Header } from '@/components/Header'
import { usePage } from '@/hooks/usePage/usePage'
import { ErrorPage } from '@/pages/ErrorPage'
import { TPageInitArgs } from '@/router/routes'
import { selectUser } from '@/selectors'
import { fetchUserInfo } from '@/thunks/user/user'

export const Layout = () => {
  usePage({ initPage: initLayout })
  const dispatch = useDispatch()
  // useEffect working only browser
  useEffect(() => {
    dispatch(fetchUserInfo())
  }, [dispatch])

  return (
    <ErrorBoundary fallback={<ErrorPage />}>
      <Header />
      <Outlet />
    </ErrorBoundary>
  )
}

export const initLayout = async ({ dispatch, state }: TPageInitArgs) => {
  if (!selectUser(state)) {
    return dispatch(fetchUserInfo())
  }
}
