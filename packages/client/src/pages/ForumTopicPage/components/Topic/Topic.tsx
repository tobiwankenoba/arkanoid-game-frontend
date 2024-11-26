import { Box, Typography } from '@mui/material'

import { TTopic } from '@/types/topic'

type TTopicProps = TTopic

export const Topic: React.FC<TTopicProps> = ({ title, text }: TTopic) => {
  return (
    <Box display="flex" flexDirection="column" maxWidth={600} width="100%">
      <Typography variant="h4" gutterBottom>
        {title}
      </Typography>
      <Typography>{text}</Typography>
    </Box>
  )
}
