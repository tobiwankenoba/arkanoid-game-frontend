import { EmojiEvents, SportsEsports, QuestionAnswer } from '@mui/icons-material'
import {
  Button,
  Grid2,
  Step,
  StepContent,
  StepLabel,
  Stepper,
  Typography,
} from '@mui/material'
import { useNavigate } from 'react-router-dom'

import { ROUTES } from '@/constants/routes'
import { HEADER_HEIGHT } from '@/constants/sizes'

const steps = [
  {
    label: 'Играй',
    description: 'Покажи свой скилл на доске лидеров',
    icon: <SportsEsports color="primary" />,
  },
  {
    label: 'Выйгрывай',
    description: 'С каждым уровнем, увеличивай свой рейтинг',
    icon: <EmojiEvents color="primary" />,
  },
  {
    label: 'Общайся с единомышленниками',
    description:
      'На форуме ты сможешь найти полезную информацию, чтобы стать первым',
    icon: <QuestionAnswer color="primary" />,
  },
]

export const HomePage = () => {
  const navigate = useNavigate()
  return (
    <Grid2
      container
      direction="column"
      sx={{
        backgroundImage: `url('src/assets/images/background.png')`,
        minHeight: `calc(100vh - ${HEADER_HEIGHT}px)`,
        paddingTop: '34px',
        paddingLeft: '160px',
      }}>
      <Grid2 size={4} container direction="column" gap={3}>
        <Typography variant="h3" color="white">
          Arkanoid
        </Typography>
        <Typography variant="subtitle1" color="white">
          Испытай адреналин, управляя платформой, чтобы отбивать мяч, разбивать
          кирпичи и собирать мощные бонусы. Каждое столкновение — это шаг ближе
          к победе, но будьте готовы к испытаниям: уровни становятся всё
          сложнее, а ваша ловкость — главным оружием.
        </Typography>
        <Button
          color="success"
          variant="contained"
          onClick={() => navigate(ROUTES.start)}>
          Играть
        </Button>
      </Grid2>
      <Grid2 alignItems="center" flex={1} container>
        <Stepper orientation="vertical">
          {steps.map((item, index) => (
            <Step key={index} active>
              <StepLabel icon={item.icon}>
                <Typography variant="h4" color="white">
                  {item.label}
                </Typography>
              </StepLabel>
              <StepContent>
                <Typography variant="h5" color="white">
                  {item.description}
                </Typography>
              </StepContent>
            </Step>
          ))}
        </Stepper>
      </Grid2>
    </Grid2>
  )
}
