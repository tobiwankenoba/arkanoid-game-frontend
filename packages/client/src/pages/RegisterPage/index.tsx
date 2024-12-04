import {
  Box,
  TextField,
  Button,
  Typography,
  Container,
  Link,
} from '@mui/material'
import React, { useState } from 'react'
import { Link as RouterLink } from 'react-router-dom'

export const RegisterPage: React.FC = () => {
  const [formData, setFormData] = useState({
    first_name: '',
    second_name: '',
    login: '',
    email: '',
    password: '',
    phone: '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    // Здесь можно обработать регистрацию
    console.log(formData)
  }

  return (
    <Container maxWidth="xs">
      <Box
        component="form"
        onSubmit={handleSubmit}
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
          value={formData.first_name}
          onChange={handleChange}
          fullWidth
          required
        />
        <TextField
          label="Фамилия"
          type="text"
          id="second_name"
          name="second_name"
          value={formData.second_name}
          onChange={handleChange}
          fullWidth
          required
        />
        <TextField
          label="Логин"
          type="text"
          id="login"
          name="login"
          value={formData.login}
          onChange={handleChange}
          fullWidth
          required
        />
        <TextField
          label="Почта"
          type="text"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          fullWidth
          required
        />
        <TextField
          label="Пароль"
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          fullWidth
          required
        />

        <TextField
          label="Телефон"
          type="text"
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
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
