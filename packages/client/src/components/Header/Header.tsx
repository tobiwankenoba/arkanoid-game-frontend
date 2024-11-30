import { Avatar, Box, Button, Grid2 } from '@mui/material'
import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'

import gameLogo from '@/assets/logos/game_logo.png'
import { ROUTES } from '@/constants/routes'

export const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  return (
    <header>
      <Box
        px={2}
        py={1}
        sx={{
          backgroundColor: 'transparent',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          boxShadow: 2,
        }}>
        <Box>
          <NavLink to={ROUTES.home}>
            <img src={gameLogo} alt="Game Logo" />
          </NavLink>
        </Box>
        <Grid2 container spacing={2}>
          <NavLink to={ROUTES.start}>
            <Button variant="contained">Играть</Button>
          </NavLink>
          <NavLink to={ROUTES.leaderboard}>
            <Button variant="outlined">Таблица лидеров</Button>
          </NavLink>
          <NavLink to={ROUTES.forum}>
            <Button variant="outlined">Форум</Button>
          </NavLink>
          {isLoggedIn ? (
            <Avatar />
          ) : (
            <Button variant="outlined" color="error">
              Войти
            </Button>
          )}
        </Grid2>
      </Box>
    </header>
  )
}
