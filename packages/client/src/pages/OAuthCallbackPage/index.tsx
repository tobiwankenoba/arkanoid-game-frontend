import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import { sendOAuthCode } from '@/api/oauth'

export const OAuthCallbackPage: React.FC = () => {
  const navigate = useNavigate()

  useEffect(() => {
    const query = new URLSearchParams(window.location.search)
    const code = query.get('code')

    if (code) {
      sendOAuthCode(code)
        .then(() => navigate('/home'))
        .catch(err => console.error('Ошибка OAuth: ', err))
    }
  }, [])

  return <div>Загрузка...</div>
}
