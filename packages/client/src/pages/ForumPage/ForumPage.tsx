import { Box, List } from '@mui/material'
import { useCallback, useState } from 'react'

import { ModalComponent } from '@/components/Modal'
import { DRAWER_NAVIGATION_LINKS } from '@/constants/drawerNav'
import { MOCK_FORUM_TOPICS } from '@/constants/mockForumTopics'
import { useToggleState } from '@/hooks/useToggleState'
import { TTopic } from '@/types/topic'

import { CreateTopic } from './components/CreateTopic'
import { DrawerNav } from './components/DrawerNav'
import { TopicItem } from './components/TopicItem'

export const ForumPage: React.FC = () => {
  const { state: modalVisible, toggle: toggleModalVisible } = useToggleState()

  const [topics, setTopics] = useState<TTopic[]>(MOCK_FORUM_TOPICS)

  const lastTopicId = topics[topics.length - 1]?.id ?? 0

  const handleTopics = useCallback((value: TTopic) => {
    setTopics(prev => [...prev, value])
  }, [])

  return (
    <Box sx={{ display: 'flex' }}>
      <DrawerNav
        onOpenModal={toggleModalVisible}
        links={DRAWER_NAVIGATION_LINKS}
      />
      <Box
        component="main"
        display="flex"
        justifyContent="center"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${260}px)` },
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
