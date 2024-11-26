import { Box, List, ListItem } from '@mui/material'

import { TCommentTopic } from '@/types/topic'

type TCommentProps = {
  comments: TCommentTopic[]
}

export const Comments: React.FC<TCommentProps> = ({
  comments,
}: TCommentProps) => {
  return (
    <Box display="flex" flexDirection="column" width="100%" maxWidth={600}>
      <List sx={{ display: 'flex', flexDirection: 'column-reverse' }}>
        {comments.map(({ id, text }) => (
          <ListItem key={id} sx={{ borderBottom: '0.1px solid gray' }}>
            {text}
          </ListItem>
        ))}
      </List>
    </Box>
  )
}
