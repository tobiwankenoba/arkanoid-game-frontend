import {
  Button,
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'

import { sendLeaderBoardResult } from '@/api/leaderboard'
import { useAppDispatch } from '@/hooks/useAppDispatch'
import { selectUser } from '@/selectors'
import { selectLeaderBoard } from '@/selectors/leaderBoard'
import { selectTheme } from '@/selectors/theme'
import { getLeaderBoardThunk } from '@/thunks/leaderBoard'

export const LeaderboardPage: React.FC = () => {
  const { data } = useSelector(selectLeaderBoard)

  const user = useSelector(selectUser)

  const dispatch = useAppDispatch()

  const { theme } = useSelector(selectTheme)

  useEffect(() => {
    dispatch(
      getLeaderBoardThunk({
        teamName: 'grooveStreet',
        ratingFieldName: 'groove',
        cursor: 0,
        limit: 10,
      })
    )
  }, [dispatch])

  const sendResult = async () => {
    const userResult = data.find(item => item.userId === user?.id)

    await sendLeaderBoardResult({
      ratingFieldName: 'groove',
      teamName: 'grooveStreet',
      data: {
        value: Number(userResult?.points ?? 0) + 10,
        userId: Number(user?.id),
        name: String(user?.first_name),
        groove: Number(userResult?.groove ?? 0) + 1,
      },
    })
  }

  return (
    <Container
      sx={{
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        pt: 10,
        backgroundColor: theme === 'black' ? 'black' : 'transparent',
      }}>
      <Typography gutterBottom color="info" variant="h2">
        LeaderBoard
      </Typography>
      <Button
        onClick={sendResult}
        variant="outlined"
        sx={{
          backgroundColor: theme === 'black' ? 'white' : 'transparent',
          mb: 3,
        }}>
        Отправить dummy результат
      </Button>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Место</TableCell>
              <TableCell align="right">Игрок</TableCell>
              <TableCell align="right">Количество очков</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.length === 0 && (
              <TableRow>
                <TableCell
                  sx={{
                    height: '200px',
                    textAlign: 'center',
                  }}
                  colSpan={3}>
                  Здесь будут лучшие рекодры!
                </TableCell>
              </TableRow>
            )}
            {data.map(({ name, points }, index) => (
              <TableRow
                key={index}
                sx={{
                  '&:last-child td, &:last-child th': { border: 0 },
                }}>
                <TableCell component="th" scope="row">
                  {index + 1}
                </TableCell>
                <TableCell align="right">{name}</TableCell>
                <TableCell align="right">{points}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  )
}
