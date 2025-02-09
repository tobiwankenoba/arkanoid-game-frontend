import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { TTopic, TCommentTopic } from '@/types/topic'

type TForumState = {
  topics: TTopic[]
  comments: TCommentTopic[]
}

const initialState: TForumState = {
  topics: [],
  comments: [],
}

const forumSlice = createSlice({
  name: 'forum',
  initialState,
  reducers: {
    setTopics(state, action: PayloadAction<TTopic[]>) {
      state.topics = action.payload
    },
    setComments(state, action: PayloadAction<TCommentTopic[]>) {
      state.comments = action.payload
    },
    addComment(state, action: PayloadAction<TCommentTopic>) {
      state.comments.push(action.payload)
    },
  },
})

export const {
  reducer: forumReducer,
  actions: { setTopics, setComments, addComment },
} = forumSlice
