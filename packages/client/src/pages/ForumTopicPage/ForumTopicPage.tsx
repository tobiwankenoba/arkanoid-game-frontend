import { Box } from '@mui/material'
import { useCallback, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

import { addCommentQuery, getComments } from '@/api/forum'
import { useAppDispatch } from '@/hooks/useAppDispatch'
import { selectTopicById } from '@/selectors/forum'
import { selectTheme } from '@/selectors/theme'
import { addComment } from '@/slices/forumSlice'
import { TCommentTopic } from '@/types/topic'

import { AddComment } from './components/AddComment'
import { Comments } from './components/Comments'
import { Topic } from './components/Topic'

export const ForumTopicPage: React.FC = () => {
  const dispatch = useAppDispatch()
  const { id } = useParams()
  const topicId = Number(id)

  const { theme } = useSelector(selectTheme)
  const currentTopic = useSelector(selectTopicById(Number(id)))
  const [comments, setComments] = useState<TCommentTopic[]>([])

  const handleActiveComments = useCallback(
    async (newComment: TCommentTopic) => {
      try {
        await addCommentQuery(newComment)
        setComments(prev => [...prev, newComment])
        dispatch(addComment(newComment))
      } catch (error) {
        console.error('Ошибка при добавлении комментария:', error)
      }
    },
    [dispatch]
  )

  useEffect(() => {
    getComments().then((data: TCommentTopic[]) => {
      const filteredComments = data.filter(
        comment => comment.topicId === topicId
      )
      setComments(filteredComments)
    })
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
