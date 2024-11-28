import { Box, Button, Typography } from '@mui/material'

export const ServerErrorPage: React.FC = () => {
  const handleReloadPage = () => {
    window.location.reload()
  }

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      flexDirection="column"
      height="100vh">
      <Typography variant="h1">500</Typography>
      <Typography gutterBottom variant="h4">
        Internal Server Error
      </Typography>
      <Button onClick={handleReloadPage} variant="contained">
        Try reload this page
      </Button>
    </Box>
  )
}
