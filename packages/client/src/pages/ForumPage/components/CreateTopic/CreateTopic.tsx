import { Box, Button, TextField } from '@mui/material'
import { useRef, useState } from 'react'

import { TTopic } from '@/types/topic'

type CreateTopicProps = {
  onAddTopic: (value: TTopic) => void
  onToggleModalVisible: VoidFunction
  lastTopicId: number
}

export const CreateTopic: React.FC<CreateTopicProps> = ({
  onAddTopic,
  onToggleModalVisible,
  lastTopicId,
}) => {
  const [createButtonDisabled, setCreateButtonDisabled] = useState(true)

  const titleRef = useRef<HTMLInputElement>(null)

  const textRef = useRef<HTMLTextAreaElement>(null)

  const handleCreateTopic = () => {
    if (titleRef.current && textRef.current) {
      onAddTopic({
        id: ++lastTopicId,
        title: titleRef.current.value,
        text: textRef.current.value,
      })
    }

    onToggleModalVisible()
  }

  const handleChangeInputs = () => {
    setCreateButtonDisabled(
      Number(titleRef.current?.value.trim().length) < 4 ||
        Number(textRef.current?.value.trim().length) < 16
    )
  }

  return (
    <Box display={'flex'} flexDirection={'column'} gap={3}>
      <TextField
        inputRef={titleRef}
        onChange={handleChangeInputs}
        id="outlined-basic"
        label="Title"
        variant="outlined"
      />
      <TextField
        id="outlined-multiline"
        label="Type topic text here"
        inputRef={textRef}
        onChange={handleChangeInputs}
        multiline
        rows={7}
        variant="outlined"
      />
      <Box display={'flex'} justifyContent={'flex-end'} gap={2}>
        <Button
          variant="contained"
          color="error"
          onClick={onToggleModalVisible}>
          Cancel
        </Button>
        <Button
          variant="contained"
          disabled={createButtonDisabled}
          onClick={handleCreateTopic}>
          Create Topic
        </Button>
      </Box>
    </Box>
  )
}
