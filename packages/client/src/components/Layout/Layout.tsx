import { Box } from '@mui/material'
import React, { useEffect } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import { useSelector } from 'react-redux'
import { Outlet } from 'react-router-dom'

import { Header } from '@/components/Header'
import { useAppDispatch } from '@/hooks/useAppDispatch'
import { usePage } from '@/hooks/usePage/usePage'
import { ErrorPage } from '@/pages/ErrorPage'
import { TPageInitArgs } from '@/router/routes'
import { selectTheme } from '@/selectors/theme'
import { fetchUserInfo } from '@/thunks/user/user'

export const Layout = () => {
  usePage({ initPage: initLayout })

  const dispatch = useAppDispatch()

  const { theme } = useSelector(selectTheme)

  useEffect(() => {
    dispatch(fetchUserInfo())
  }, [dispatch])

  return (
    <ErrorBoundary fallback={<ErrorPage />}>
      <Header />
      <Box
        sx={{
          height: 'calc(100vh - 95px)',
          backgroundColor: theme === 'black' ? 'black' : 'transparent',
        }}>
        <Outlet />
      </Box>
    </ErrorBoundary>
  )
}

export const initLayout = async ({ state }: TPageInitArgs) => {
  console.log(state)
}
