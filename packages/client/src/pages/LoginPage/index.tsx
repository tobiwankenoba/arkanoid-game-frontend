import {
  Box,
  TextField,
  Button,
  Typography,
  Link,
  Container,
} from '@mui/material'
import React, { useEffect } from 'react'
import { Link as RouterLink, useNavigate } from 'react-router-dom'

import { signIn } from '@/api/auth'
import { YandexOAuthButton } from '@/components/YandexOAuthButton'
import { ROUTES } from '@/constants/routes'
import { useAuthStatus } from '@/hooks/useAuthStatus'
import { useForm } from '@/hooks/useForm'
import { loginValidationSchema } from '@/hooks/useForm/schemas/loginValidationSchema'

export const LoginPage: React.FC = () => {
  const { values, errors, handleChange, handleSubmit } = useForm({
    initialValues: {
      login: '',
      password: '',
    },
    validationSchema: loginValidationSchema,
  })

  const navigate = useNavigate()

  const isAuthenticated = useAuthStatus()
  useEffect(() => {
    if (isAuthenticated) {
      setTimeout(() => {
        navigate(ROUTES.home)
      }, 1500)
    }
  }, [])

  const onSubmit = async (formValues: { login: string; password: string }) => {
    try {
      const authentication = await signIn(formValues)
      if (authentication === 200) {
        navigate(ROUTES.home)
      }
    } catch (error) {
      console.error('Ошибка авторизации:', error)
    }
  }

  return (
    <Container maxWidth="xs">
      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        autoComplete="off"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
          padding: 3,
          border: '1px solid #ccc',
          borderRadius: '8px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          mt: 5,
        }}>
        <Typography variant="h5" textAlign="center" mb={3}>
          Вход
        </Typography>
        <TextField
          label="Логин"
          type="text"
          id="login"
          name="login"
          value={values.login}
          onChange={handleChange}
          error={!!errors.login}
          helperText={errors.login}
          fullWidth
          required
          autoComplete="off"
          slotProps={{
            inputLabel: {
              shrink: true,
            },
          }}
        />

        <TextField
          label="Пароль"
          type="password"
          id="password"
          name="password"
          value={values.password}
          onChange={handleChange}
          error={!!errors.password}
          helperText={errors.password}
          fullWidth
          required
          autoComplete="off"
          slotProps={{
            inputLabel: {
              shrink: true,
            },
          }}
        />

        <Button type="submit" variant="contained" color="primary" fullWidth>
          Войти
        </Button>
        <YandexOAuthButton />
        <Typography variant="body2" textAlign="center" mt={2}>
          Нет аккаунта?{' '}
          <Link component={RouterLink} to="/register" underline="hover">
            Создать
          </Link>
        </Typography>
      </Box>
    </Container>
  )
}
