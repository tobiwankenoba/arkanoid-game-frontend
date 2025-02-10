import axios from 'axios'

import { API_URL } from '@/constants/api'
import { TCommentTopic, TTopic } from '@/types/topic'

import { getUserId } from './auth'

export const getTopics = async (): Promise<TTopic[]> => {
  try {
    const userId = await getUserId()
    const response = axios.post<{ topics: TTopic[] }>(
      `${API_URL}/topics`,
      { userId },
      {
        headers: { 'Content-Type': 'application/json' },
      }
    )

    return (await response).data.topics
  } catch (error) {
    throw new Error(
      error instanceof Error ? error.message : 'Ошибка загрузки данных'
    )
  }
}

export const getComments = async (): Promise<TCommentTopic[]> => {
  try {
    const userId = await getUserId()
    const response = axios.post(
      `${API_URL}/comments`,
      { userId },
      {
        headers: { 'Content-Type': 'application/json' },
      }
    )

    return (await response).data
  } catch (error) {
    throw new Error(
      error instanceof Error ? error.message : 'Ошибка загрузки данных'
    )
  }
}

export const addCommentQuery = async (commentData: TCommentTopic) => {
  try {
    const userId = await getUserId()
    const response = await axios.post(
      `${API_URL}/comment`,
      { userId, ...commentData },
      {
        headers: { 'Content-Type': 'application/json' },
      }
    )

    return response.data
  } catch (error) {
    throw new Error(
      error instanceof Error
        ? error.message
        : 'Ошибка при добавлении комментария:'
    )
  }
}

export const addTopicQuery = async (topicData: TTopic) => {
  try {
    const userId = await getUserId()
    const response = await axios.post(
      `${API_URL}/topic`,
      { userId, ...topicData },
      {
        headers: { 'Content-Type': 'application/json' },
      }
    )

    return response.data
  } catch (error) {
    throw new Error(
      error instanceof Error
        ? error.message
        : 'Ошибка при добавлении нового топика:'
    )
  }
}
