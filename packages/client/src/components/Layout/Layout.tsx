import { Box } from '@mui/material'
import React, { useEffect } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import { useSelector } from 'react-redux'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'

import { sendOAuthCode } from '@/api/oauth'
import { Header } from '@/components/Header'
import { ROUTES } from '@/constants/routes'
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

  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    dispatch(fetchUserInfo())
  }, [dispatch])

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search)
    const code = searchParams.get('code')

    if (code) {
      console.log('Полученный code авторизации:', code)

      sendOAuthCode(code)
        .then(() => {
          console.log('OAuth авторизация успешна!')
          navigate(ROUTES.home, { replace: true })
          window.location.reload()
        })
        .catch(error => {
          console.error('Ошибка при авторизации через OAuth:', error)
          navigate(ROUTES.login)
        })
    }
  }, [location.search])

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
