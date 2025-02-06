import { Box } from '@mui/material'
import axios from 'axios'
import React, { useEffect } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import { useSelector } from 'react-redux'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'

import { getUserInfo } from '@/api/auth'
import { sendOAuthCode } from '@/api/oauth'
import { Header } from '@/components/Header'
import { API_URL } from '@/constants/api'
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
      sendOAuthCode(code)
        .then(() => getUserInfo())
        .then(user => {
          if (!user) {
            throw new Error('Не удалось получить данные пользователя')
          }

          return axios.post(
            `${API_URL}/user`,
            {
              id: user.id,
              login: user.login,
              display_name: user.display_name,
              avatar: user.avatar,
            },
            {
              headers: {
                'Content-Type': 'application/json',
              },
            }
          )
        })
        .then(() => {
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
