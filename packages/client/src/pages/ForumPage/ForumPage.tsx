import { Box, List, Button } from '@mui/material'
import { useCallback, useEffect } from 'react'
import { useSelector } from 'react-redux'

import { addTopicQuery, getTopics } from '@/api/forum'
import { ModalComponent } from '@/components/Modal'
import { useAppDispatch } from '@/hooks/useAppDispatch'
import { useToggleState } from '@/hooks/useToggleState'
import { selectTopics } from '@/selectors/forum'
import { selectTheme } from '@/selectors/theme'
import { setTopics } from '@/slices/forumSlice'
import { TTopic } from '@/types/topic'

import { CreateTopic } from './components/CreateTopic'
import { TopicItem } from './components/TopicItem'

export const ForumPage: React.FC = () => {
  const dispatch = useAppDispatch()
  const { state: modalVisible, toggle: toggleModalVisible } = useToggleState()
  const topics = useSelector(selectTopics)
  const lastTopicId = topics[topics.length - 1]?.id ?? 0

  const { theme } = useSelector(selectTheme)

  useEffect(() => {
    getTopics()
      .then(data => dispatch(setTopics([...data])))
      .catch(error => console.error(error))
  }, [])

  const handleTopics = useCallback(
    async (topic: TTopic) => {
      try {
        const newTopic = await addTopicQuery(topic)
        dispatch(setTopics([...topics, newTopic]))
      } catch (error) {
        console.error('Ошибка при создании темы:', error)
      }
    },
    [dispatch, topics]
  )

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
      <Box
        component="main"
        display="flex"
        flexDirection="column"
        alignItems="center"
        sx={{
          width: 600,
          color: theme === 'black' ? 'white' : 'black',
          backgroundColor: theme === 'black' ? 'black' : 'transparent',
        }}>
        <Button
          variant="contained"
          color="primary"
          onClick={toggleModalVisible}
          sx={{ marginBottom: 2, alignSelf: 'center' }}>
          Создать тему
        </Button>

        <List sx={{ width: '100%' }}>
          {topics.map((topic, index) => (
            <TopicItem key={index} {...topic} />
          ))}
        </List>
      </Box>

      <ModalComponent
        width={600}
        open={modalVisible}
        onClose={toggleModalVisible}>
        <CreateTopic
          lastTopicId={lastTopicId}
          onToggleModalVisible={toggleModalVisible}
          onAddTopic={handleTopics}
        />
      </ModalComponent>
    </Box>
  )
}
