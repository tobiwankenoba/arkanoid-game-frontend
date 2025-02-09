import { Box, List } from '@mui/material'
import { useCallback, useEffect } from 'react'
import { useSelector } from 'react-redux'

import { getTopics } from '@/api/forum'
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
    (value: TTopic) => {
      dispatch(setTopics([...topics, value]))
    },
    [dispatch, topics]
  )

  return (
    <Box sx={{ display: 'flex' }}>
      <Box
        component="main"
        display="flex"
        justifyContent="center"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: '100%' },
          color: theme === 'black' ? 'white' : 'black',
          backgroundColor: theme === 'black' ? 'black' : 'transparent',
        }}>
        <List sx={{ width: 600 }}>
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
