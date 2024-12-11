import {
  Box,
  TextField,
  Button,
  Typography,
  Container,
  Link,
} from '@mui/material'
import React from 'react'
import { Link as RouterLink } from 'react-router-dom'

import { useForm } from '@/hooks/useForm'

export const RegisterPage: React.FC = () => {
  const { values, errors, handleChange, handleSubmit } = useForm({
    initialValues: {
      first_name: '',
      second_name: '',
      login: '',
      email: '',
      password: '',
      phone: '',
    },
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
          Регистрация
        </Typography>
        <TextField
          label="Имя"
          type="text"
          id="first_name"
          name="first_name"
          value={values.first_name}
          onChange={handleChange}
          error={!!errors.first_name}
          helperText={errors.first_name}
          fullWidth
          required
        />
        <TextField
          label="Фамилия"
          type="text"
          id="second_name"
          name="second_name"
          value={values.second_name}
          onChange={handleChange}
          error={!!errors.second_name}
          helperText={errors.second_name}
          fullWidth
          required
        />
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
          label="Почта"
          type="text"
          id="email"
          name="email"
          value={values.email}
          onChange={handleChange}
          error={!!errors.email}
          helperText={errors.email}
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

        <TextField
          label="Телефон"
          type="text"
          id="phone"
          name="phone"
          value={values.phone}
          onChange={handleChange}
          error={!!errors.phone}
          helperText={errors.phone}
          fullWidth
          required
        />
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Sign Up
        </Button>
        <Typography variant="body2" textAlign="center" mt={2}>
          <span>Уже зарегистрированы? </span>
          <Link component={RouterLink} to="/login" underline="hover">
            Войти
          </Link>
        </Typography>
      </Box>
    </Container>
  )
}
