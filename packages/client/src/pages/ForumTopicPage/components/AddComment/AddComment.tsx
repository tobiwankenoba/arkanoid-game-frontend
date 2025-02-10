import { Box, Button, TextField } from '@mui/material'
import { ChangeEvent, useState } from 'react'
import { useSelector } from 'react-redux'

import { selectTheme } from '@/selectors/theme'
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

  const { theme } = useSelector(selectTheme)

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
        content: comment.trim(),
        topicId: currentTopicId,
      })
    }
  }

  return (
    <Box
      display="flex"
      flexDirection="column"
      sx={{
        width: '100%',
        color: theme === 'black' ? 'white' : 'black',
        backgroundColor: theme === 'black' ? 'black' : 'transparent',
      }}
      maxWidth={600}>
      <Box component="form" display="flex" flexDirection="column" gap={2}>
        <TextField
          multiline
          rows={4}
          onChange={handleCommentValue}
          variant="filled"
          label="Type here your comment"
          slotProps={{
            input: {
              style: {
                color: theme === 'black' ? 'white' : 'black',
                background: theme === 'black' ? 'black' : 'transparent',
                borderColor: theme === 'black' ? 'white' : 'transparent',
                borderWidth: '1px',
                borderStyle: 'solid',
              },
            },
            inputLabel: {
              style: {
                color: theme === 'black' ? 'white' : 'black',
              },
            },
          }}
          sx={{
            multilineColor: theme === 'black' ? 'white' : 'black',
            width: '100%',
            color: theme === 'black' ? 'white' : 'black',
            backgroundColor: theme === 'black' ? 'white' : 'transparent',
            borderRadius: '4px',
          }}
        />
        <Button
          disabled={disabledButtonSend}
          onClick={handleAddComment}
          variant="outlined"
          sx={{
            backgroundColor: theme === 'black' ? 'white' : 'transparent',
          }}>
          Send
        </Button>
      </Box>
    </Box>
  )
}
