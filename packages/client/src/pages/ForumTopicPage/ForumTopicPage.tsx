import { Box } from '@mui/material'
import { useCallback } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

import { useAppDispatch } from '@/hooks/useAppDispatch'
import { selectCommentsByTopicId, selectTopicById } from '@/selectors/forum'
import { selectTheme } from '@/selectors/theme'
import { addComment } from '@/slices/forumSlice'
import { TCommentTopic } from '@/types/topic'

import { AddComment } from './components/AddComment'
import { Comments } from './components/Comments'
import { Topic } from './components/Topic'

export const ForumTopicPage: React.FC = () => {
  const { id } = useParams()
  const dispatch = useAppDispatch()

  const { theme } = useSelector(selectTheme)
  const currentTopic = useSelector(selectTopicById(Number(id)))
  const comments = useSelector(selectCommentsByTopicId(Number(id)))

  const handleActiveComments = useCallback(
    (newComment: TCommentTopic) => {
      dispatch(addComment(newComment))
    },
    [dispatch]
  )

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
        {currentTopic && (
          <>
            <Topic {...currentTopic} />
            <AddComment
              lastCommentId={comments.at(-1)?.id ?? 0}
              currentTopicId={currentTopic.id}
              onAddComment={handleActiveComments}
            />
            <Comments comments={comments} />
          </>
        )}
      </Box>
    </Box>
  )
}
