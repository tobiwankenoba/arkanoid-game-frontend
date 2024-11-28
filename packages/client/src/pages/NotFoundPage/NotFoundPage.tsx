import { Button, Container, Typography } from '@mui/material'
import React from 'react'
import { NavLink } from 'react-router-dom'

import { ROUTES } from '@/constants/routes'

export const NotFoundPage: React.FC = () => {
  return (
    <Container
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        height: '100vh',
      }}>
      <Typography variant="h1">404</Typography>
      <Typography gutterBottom variant="h3">
        Page not found
      </Typography>
      <NavLink to={ROUTES.home}>
        <Button variant="contained">Go to main page</Button>
      </NavLink>
    </Container>
  )
}
