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
import { useSelector } from 'react-redux'

import { sendLeaderBoardResult } from '@/api/leaderboard'
import { selectLeaderBoard } from '@/selectors/leaderBoard'

export const LeaderboardPage: React.FC = () => {
  const leaderBoard = useSelector(selectLeaderBoard)

  const sendResult = async () => {
    await sendLeaderBoardResult({
      ratingFieldName: 'groove',
      teamName: 'groove',
      data: { value: 200, name: 'Roman', RatingFieldName: 'groove' },
    })
  }

  return (
    <Container
      sx={{
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        mt: 10,
      }}>
      <Typography gutterBottom color="info" variant="h2">
        LeaderBoard
      </Typography>
      <Button onClick={sendResult}>Отправить dummy результат</Button>

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
            {leaderBoard.length === 0 && (
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
            {leaderBoard
              .sort((a, b) => (a.points < b.points ? 1 : -1))
              .slice(0, 5)
              .map(({ name, points }, index) => (
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
