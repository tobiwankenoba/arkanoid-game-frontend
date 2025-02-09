import { createSelector } from '@reduxjs/toolkit'

import { forumState } from './forumState'

export const selectTopics = createSelector(forumState, forum => forum.topics)

export const selectComments = createSelector(
  forumState,
  forum => forum.comments
)

export const selectTopicById = (id: number) =>
  createSelector(selectTopics, topics => topics.find(t => t.id === id))

export const selectCommentsByTopicId = (id: number) =>
  createSelector(selectComments, comments =>
    comments.filter(c => c.topicId === id)
  )
