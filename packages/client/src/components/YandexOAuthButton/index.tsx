import { Button } from '@mui/material'
import React, { useEffect, useState } from 'react'

import { getServiceId } from '@/api/oauth'

export const YandexOAuthButton: React.FC = () => {
  const [serviceId, setServiceId] = useState<string>('')

  useEffect(() => {
    const fetchServiceId = async () => {
      try {
        const id = await getServiceId()
        setServiceId(id)
      } catch (error) {
        console.error('Ошибка получения service_id:', error)
      }
    }
    fetchServiceId()
  }, [])

  const handleOAuth = () => {
    if (serviceId) {
      window.location.href = `https://oauth.yandex.ru/authorize?response_type=code&client_id=${serviceId}&redirect_uri=http://localhost:3000/oauth/callback`
    }
  }

  return (
    <Button
      variant="contained"
      color="secondary"
      fullWidth
      onClick={handleOAuth}
      disabled={!serviceId}>
      Войти через Яндекс
    </Button>
  )
}
