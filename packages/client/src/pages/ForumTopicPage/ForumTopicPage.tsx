import { Box } from '@mui/material'
import { useState } from 'react'
import { useParams } from 'react-router-dom'

import { DRAWER_NAVIGATION_LINKS_TOPIC_PAGE } from '@/constants/drawerNav'
import { MOCK_COMMENTS_FORUM } from '@/constants/mockCommentsForum'
import { MOCK_FORUM_TOPICS } from '@/constants/mockForumTopics'
import { TCommentTopic, TTopic } from '@/types/topic'

import { DrawerNav } from '../ForumPage/components/DrawerNav'

import { AddComment } from './components/AddComment'
import { Comments } from './components/Comments'
import { Topic } from './components/Topic'

export const ForumTopicPage: React.FC = () => {
  const { id } = useParams()

  const currentTopic = MOCK_FORUM_TOPICS.find(
    item => item.id === Number(id)
  ) as TTopic

  const [activeComments, setActiveComments] = useState(
    MOCK_COMMENTS_FORUM.filter(comment => comment.topicId === Number(id))
  )

  const handleActiveComments = (newComment: TCommentTopic) => {
    setActiveComments(prev => [...prev, newComment])
  }

  return (
    <Box display={'flex'}>
      <DrawerNav links={DRAWER_NAVIGATION_LINKS_TOPIC_PAGE} />
      <Box
        component="main"
        display={'flex'}
        alignItems={'center'}
        flexDirection={'column'}
        gap={2}
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${260}px)` },
        }}>
        <Topic {...currentTopic} />
        <AddComment
          lastCommentId={activeComments[activeComments.length - 1]?.id ?? 0}
          currentTopicId={currentTopic.id}
          onAddComment={handleActiveComments}
        />
        <Comments comments={activeComments} />
      </Box>
    </Box>
  )
}
