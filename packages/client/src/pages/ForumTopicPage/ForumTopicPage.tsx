import { Box } from '@mui/material'
import { useCallback, useState } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

import { MOCK_COMMENTS_FORUM } from '@/constants/mockCommentsForum'
import { MOCK_FORUM_TOPICS } from '@/constants/mockForumTopics'
import { selectTheme } from '@/selectors/theme'
import { TCommentTopic, TTopic } from '@/types/topic'

import { AddComment } from './components/AddComment'
import { Comments } from './components/Comments'
import { Topic } from './components/Topic'

export const ForumTopicPage: React.FC = () => {
  const { id } = useParams()

  const { theme } = useSelector(selectTheme)

  const currentTopic = MOCK_FORUM_TOPICS.find(
    item => item.id === Number(id)
  ) as TTopic

  const [activeComments, setActiveComments] = useState(
    MOCK_COMMENTS_FORUM.filter(comment => comment.topicId === Number(id))
  )

  const handleActiveComments = useCallback((newComment: TCommentTopic) => {
    setActiveComments(prev => [...prev, newComment])
  }, [])

  return (
    <Box display="flex">
      <Box
        component="main"
        display="flex"
        alignItems="center"
        flexDirection="column"
        gap={2}
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `100%` },
          color: theme === 'black' ? 'white' : 'black',
          backgroundColor: theme === 'black' ? 'black' : 'transparent',
        }}>
        <Topic {...currentTopic} />
        <AddComment
          lastCommentId={activeComments[activeComments.length - 1]?.id ?? 0}
          currentTopicId={currentTopic?.id ?? 0}
          onAddComment={handleActiveComments}
        />
        <Comments comments={activeComments} />
      </Box>
    </Box>
  )
}
