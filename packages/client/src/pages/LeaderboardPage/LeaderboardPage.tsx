import {
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

import { TABLE_VALUE_MOCK } from '@/constants/leaderBoardMock'

export const LeaderboardPage: React.FC = () => {
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
            {TABLE_VALUE_MOCK.sort((a, b) => (a.points < b.points ? 1 : -1))
              .slice(0, 5)
              .map(({ name, id, points }, index) => (
                <TableRow
                  key={id}
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
