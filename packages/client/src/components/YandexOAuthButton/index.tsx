import { Button } from '@mui/material'
import React, { useEffect, useState } from 'react'

import { getServiceId } from '@/api/oauth'
import { REDIRECT_URI } from '@/constants/api'

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
    getServiceId().then(serviceId => {
      window.location.href = `https://oauth.yandex.ru/authorize?response_type=code&client_id=${serviceId}&redirect_uri=${REDIRECT_URI}`
    })
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
