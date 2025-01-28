import axios from 'axios'

export const getServiceId = async () => {
  const response = await axios.get(
    'https://ya-praktikum.tech/api/v2/oauth/yandex/service-id',
    {
      params: { redirect_uri: 'http://localhost:3000/oauth/callback' },
    }
  )
  return response.data.service_id
}

export const sendOAuthCode = async (code: string) => {
  const response = await axios.post(
    'https://ya-praktikum.tech/api/v2/oauth/yandex',
    {
      code,
      redirect_uri: 'http://localhost:3000/oauth/callback',
    }
  )
  return response.data
}
