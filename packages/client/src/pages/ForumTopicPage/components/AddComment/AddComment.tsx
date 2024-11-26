import { Box, Button, TextField } from '@mui/material'
import { useRef, useState } from 'react'

import { TCommentTopic } from '@/types/topic'

type TAddCommentProps = {
  onAddComment: (newComment: TCommentTopic) => void
  lastCommentId: number
  currentTopicId: number
}

export const AddComment: React.FC<TAddCommentProps> = ({
  onAddComment,
  lastCommentId,
  currentTopicId,
}: TAddCommentProps) => {
  const [disabledButtonSend, setDisabledButtonSend] = useState(true)

  const commentRef = useRef<HTMLTextAreaElement>(null)

  const handleCommentValue = () => {
    setDisabledButtonSend(Number(commentRef.current?.value.trim().length) < 1)
  }

  const handleAddComment = () => {
    if (commentRef.current) {
      onAddComment({
        id: ++lastCommentId,
        text: commentRef.current.value.trim(),
        topicId: currentTopicId,
      })
    }
  }

  return (
    <Box
      display="flex"
      flexDirection="column"
      sx={{ width: '100%' }}
      maxWidth={600}>
      <Box display="flex" flexDirection="column" gap={2}>
        <TextField
          multiline
          inputRef={commentRef}
          rows={4}
          onChange={handleCommentValue}
          variant="outlined"
          label="Type here your comment"
          sx={{ width: '100%' }}
        />
        <Button
          disabled={disabledButtonSend}
          onClick={handleAddComment}
          variant="contained">
          Send
        </Button>
      </Box>
    </Box>
  )
}
