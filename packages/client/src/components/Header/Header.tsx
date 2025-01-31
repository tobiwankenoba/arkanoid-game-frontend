import { Box, Button, FormControlLabel, Grid2, Switch } from '@mui/material'
import { useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'

import { logout } from '@/api/auth'
import gameLogo from '@/assets/logos/game_logo.png'
import { ROUTES } from '@/constants/routes'
import { useAppDispatch } from '@/hooks/useAppDispatch'
import { selectUser } from '@/selectors'
import { selectTheme } from '@/selectors/theme'
import { setTheme } from '@/slices'
import { TTheme } from '@/types/themes'

export const Header = () => {
  const user = useSelector(selectUser)

  const dispatch = useAppDispatch()

  console.log(user)

  const { theme } = useSelector(selectTheme)

  const changeTheme = (theme: TTheme) => {
    dispatch(setTheme(theme))
  }

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
          height: '95px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          boxShadow: 2,
          backgroundColor: theme === 'black' ? 'black' : 'transparent',
        }}>
        <Box>
          <NavLink to={ROUTES.home}>
            <img src={gameLogo} alt="Game Logo" />
          </NavLink>
        </Box>
        <Grid2 container spacing={2}>
          <FormControlLabel
            control={
              <Switch
                onChange={e =>
                  changeTheme(e.currentTarget.checked ? 'black' : 'white')
                }
              />
            }
            label="Dark Mode"
            sx={{
              color: theme === 'black' ? 'white' : 'black',
            }}
          />
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
