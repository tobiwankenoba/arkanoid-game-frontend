import { Box, List } from '@mui/material'
import { useCallback, useState } from 'react'
import { useSelector } from 'react-redux'

import { ModalComponent } from '@/components/Modal'
import { MOCK_FORUM_TOPICS } from '@/constants/mockForumTopics'
import { useToggleState } from '@/hooks/useToggleState'
import { selectTheme } from '@/selectors/theme'
import { TTopic } from '@/types/topic'

import { CreateTopic } from './components/CreateTopic'
import { TopicItem } from './components/TopicItem'

export const ForumPage: React.FC = () => {
  const { state: modalVisible, toggle: toggleModalVisible } = useToggleState()

  const [topics, setTopics] = useState<TTopic[]>(MOCK_FORUM_TOPICS)

  const lastTopicId = topics[topics.length - 1]?.id ?? 0

  const { theme } = useSelector(selectTheme)

  const handleTopics = useCallback((value: TTopic) => {
    setTopics(prev => [...prev, value])
  }, [])

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
