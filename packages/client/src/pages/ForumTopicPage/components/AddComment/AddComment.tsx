import { Box, Button, TextField } from '@mui/material'
import { ChangeEvent, useState } from 'react'

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

  const [comment, setComment] = useState<string>()

  const handleCommentValue = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const newComment = e.target.value

    setComment(newComment)

    setDisabledButtonSend(Number(newComment.trim().length) < 1)
  }

  const handleAddComment = () => {
    if (comment) {
      onAddComment({
        id: ++lastCommentId,
        text: comment.trim(),
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
