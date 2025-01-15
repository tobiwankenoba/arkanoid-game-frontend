import { Box, Button, Grid2 } from '@mui/material'
import { useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'

import { logout } from '@/api/auth'
import gameLogo from '@/assets/logos/game_logo.png'
import { ROUTES } from '@/constants/routes'
import { selectUser } from '@/selectors'

export const Header = () => {
  const user = useSelector(selectUser)

  const handleLogout = async () => {
    await logout()

    window.location.reload()
  }

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
          {user ? (
            <NavLink to={ROUTES.login} onClick={handleLogout}>
              <Button variant="outlined" color="error">
                Выйти
              </Button>
            </NavLink>
          ) : (
            <NavLink to={ROUTES.login}>
              <Button variant="outlined" color="error">
                Войти
              </Button>
            </NavLink>
          )}
        </Grid2>
      </Box>
    </header>
  )
}
