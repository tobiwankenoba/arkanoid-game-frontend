import axios from 'axios'

import { BASE_URL, REDIRECT_URI } from '@/constants/api'

export const getServiceId = async () => {
  const response = await axios.get(`${BASE_URL}/oauth/yandex/service-id`, {
    params: { redirect_uri: REDIRECT_URI },
  })
  return response.data.service_id
}

export const sendOAuthCode = async (code: string) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/oauth/yandex`,
      {
        code,
        redirect_uri: REDIRECT_URI,
      },
      { withCredentials: true }
    )

    console.log('Ответ сервера на OAuth:', response.data)
    return response.data
  } catch (error) {
    throw new Error(`Ошибка отправки OAuth кода: ${error}`)
  }
}
