import axios from 'axios'

import { API_URL } from '@/constants/api'
import { TTopic } from '@/types/topic'

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
