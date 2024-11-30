import { Box, Button, TextField } from '@mui/material'
import { ChangeEvent, useState } from 'react'

import { TTopic } from '@/types/topic'

type TCreateTopicProps = {
  onAddTopic: (value: TTopic) => void
  onToggleModalVisible: VoidFunction
  lastTopicId: number
}

export const CreateTopic: React.FC<TCreateTopicProps> = ({
  onAddTopic,
  onToggleModalVisible,
  lastTopicId,
}: TCreateTopicProps) => {
  const [createButtonDisabled, setCreateButtonDisabled] = useState(true)

  const [title, setTitle] = useState<string>()

  const [text, setText] = useState<string>()

  const handleCreateTopic = () => {
    if (title && text) {
      onAddTopic({
        id: ++lastTopicId,
        title: title,
        text: text,
      })
    }

    onToggleModalVisible()
  }

  const handleChangeInputs = (title: string, text: string) => {
    setCreateButtonDisabled(
      Number(title?.trim().length) < 4 || Number(text?.trim().length) < 16
    )
  }

  const handleTitle = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setTitle(e.target.value)

    handleChangeInputs(e.target.value, String(text))
  }

  const handleText = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setText(e.target.value)

    handleChangeInputs(String(title), e.target.value)
  }

  return (
    <Box component="form" display="flex" flexDirection="column" gap={3}>
      <TextField
        onChange={handleTitle}
        id="outlined-basic"
        label="Title"
        variant="outlined"
      />
      <TextField
        id="outlined-multiline"
        label="Type topic text here"
        onChange={handleText}
        multiline
        rows={7}
        variant="outlined"
      />
      <Box display="flex" justifyContent="flex-end" gap={2}>
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
