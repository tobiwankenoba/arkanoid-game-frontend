import {
  Box,
  TextField,
  Button,
  Typography,
  Link,
  Container,
} from '@mui/material'
import React from 'react'
import { Link as RouterLink } from 'react-router-dom'

import { useForm } from '@/hooks/useForm'
import { validationSchema } from '@/hooks/useForm/validationSchema'

export const LoginPage: React.FC = () => {
  const { values, errors, handleChange, handleSubmit } = useForm({
    initialValues: {
      login: '',
      password: '',
    },
    validationSchema,
  })

  const onSubmit = (data: typeof values) => {
    console.log('Отправка данных:', data)
  }

  return (
    <Container maxWidth="xs">
      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
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
        />
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Войти
        </Button>
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
