import { Button, Container, Grid2, Typography } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom'

import errorMonkey from '@/assets/images/error_monkey.png'
import { ROUTES } from '@/constants/routes'

export const ErrorPage = () => {
  const navigate = useNavigate()
  return (
    <Container>
      <Grid2
        container
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
        }}
        spacing={2}>
        <img src={errorMonkey} alt="Error Monkey" />
        <Typography variant="h3">Ууупс....</Typography>
        <Typography variant="h3">
          Что-то пошло не так, но мы уже это чиним
        </Typography>
        <Button
          variant="contained"
          size="large"
          onClick={() => navigate(ROUTES.home)}>
          Вернуться на главную
        </Button>
      </Grid2>
    </Container>
  )
}
