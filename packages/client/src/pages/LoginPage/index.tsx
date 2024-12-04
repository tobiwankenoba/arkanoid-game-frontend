import {
  Box,
  TextField,
  Button,
  Typography,
  Link,
  Container,
} from '@mui/material'
import React, { useState } from 'react'
import { Link as RouterLink } from 'react-router-dom'

export const LoginPage: React.FC = () => {
  const [formData, setFormData] = useState({
    login: '',
    password: '',
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
    // Здесь можно обработать вход в систему
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
          Вход
        </Typography>
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
          label="Пароль"
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
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
