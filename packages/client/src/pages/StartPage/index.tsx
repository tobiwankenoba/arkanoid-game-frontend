import { Box, Button, Card, Container, Dialog, Grid2 } from '@mui/material'
import React, { useState } from 'react'
import { CountdownCircleTimer } from 'react-countdown-circle-timer'
import { useNavigate } from 'react-router-dom'

import { ROUTES } from '@/constants/routes'
import Instruction from '@/pages/StartPage/components/Instruction'

const HEADER_HEIGHT = 92

export const StartGame = () => {
  const [isInstructionOpened, setIsInstructionOpened] = useState(false)
  const [isCountStarted, setIsCountStarted] = useState(false)
  const navigate = useNavigate()
  return (
    <>
      <Container>
        <Box
          sx={{
            minHeight: `calc(100vh - ${HEADER_HEIGHT}px)`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
          }}>
          <Card sx={{ padding: '36px' }}>
            <Grid2
              sx={{ display: 'flex', flexDirection: 'column' }}
              spacing={2}
              container>
              <Button
                variant="contained"
                onClick={() => setIsCountStarted(true)}>
                Старт
              </Button>
              <Button
                variant="outlined"
                size="large"
                onClick={() => setIsInstructionOpened(!isInstructionOpened)}>
                Инструкция
              </Button>
              <Button variant="outlined" size="large" color="error">
                Вернуться на главную
              </Button>
            </Grid2>
          </Card>
          {isCountStarted && (
            <Box
              sx={{
                position: 'absolute',
                width: '100vw',
                height: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: 'rgba(85, 85, 85, 0.6)',
              }}>
              <CountdownCircleTimer
                onComplete={() => navigate(ROUTES.game)}
                duration={5}
                size={200}
                strokeWidth={20}
                colors="#DADADA"
                isPlaying={isCountStarted}>
                {({ remainingTime }) => remainingTime}
              </CountdownCircleTimer>
            </Box>
          )}
        </Box>
      </Container>
      <Dialog
        open={isInstructionOpened}
        onClose={() => setIsInstructionOpened(!isInstructionOpened)}
        maxWidth="md">
        <Instruction />
      </Dialog>
    </>
  )
}
