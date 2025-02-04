import axios from 'axios'

export const REDIRECT_URI = 'http://localhost:3000'

export const getServiceId = async () => {
  const response = await axios.get(
    'https://ya-praktikum.tech/api/v2/oauth/yandex/service-id',
    {
      params: { redirect_uri: REDIRECT_URI },
    }
  )
  return response.data.service_id
}

export const sendOAuthCode = async (code: string) => {
  try {
    const response = await axios.post(
      'https://ya-praktikum.tech/api/v2/oauth/yandex',
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
