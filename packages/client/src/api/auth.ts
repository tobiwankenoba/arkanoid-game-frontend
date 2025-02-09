import axios from 'axios'

import { API_URL, BASE_URL } from '@/constants/api'
import {
  ISignUpRequest,
  ISignInRequest,
  ISignUpResponse,
  IErrorResponse,
  IUserInfo,
} from '@/types/auth'

export const signUp = async (
  data: ISignUpRequest
): Promise<ISignUpResponse | IErrorResponse> => {
  try {
    const response = await axios.post<ISignUpResponse>(
      `${BASE_URL}/auth/signup`,
      data,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )

    console.log('User signed in successfully:', response.status)
    sessionStorage.setItem('token', 'ok')

    await axios.post(
      `${API_URL}/user`,
      {
        id: response.data.id,
        login: data.login,
        display_name: data.first_name + ' ' + data.second_name,
        avatar: null,
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )
    return {
      id: response.data.id,
      status: response.status,
      data: response.data,
    }
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      alert(error.response.data.reason)
      return {
        status: error.response.status || 500,
        reason: error.response.data?.reason || 'Unknown error',
      }
    }
    throw new Error('Unexpected error occurred')
  }
}

export const signIn = async (
  data: ISignInRequest
): Promise<void | IErrorResponse | number> => {
  try {
    const response = await axios.post(`${BASE_URL}/auth/signin`, data, {
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: true,
    })
    console.log('User signed in successfully:', response.status)
    sessionStorage.setItem('token', 'ok')
    return response.status
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      return error.response.data as IErrorResponse
    }
    throw new Error('Unexpected error occurred')
  }
}

export const logout = async (): Promise<void | IErrorResponse> => {
  try {
    const response = await axios.post(
      `${BASE_URL}/auth/logout`,
      {},
      {
        withCredentials: true,
      }
    )
    console.log('User logged out successfully:', response.status)

    sessionStorage.removeItem('token')
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      return error.response.data as IErrorResponse
    }
    throw new Error('Unexpected error occurred')
  }
}

export const getUserInfo = async (): Promise<IUserInfo | null> => {
  try {
    const response = await axios.get<IUserInfo | IErrorResponse>(
      `${BASE_URL}/auth/user`,
      {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      }
    )

    if (response.status !== 200 && (response.data as IErrorResponse).reason) {
      return null
    }

    return response.data as IUserInfo
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      return null
    }
    throw new Error('Unexpected error occurred')
  }
}

export const getUserId = async (): Promise<number | null> => {
  const userInfo = await getUserInfo()
  return userInfo ? userInfo.id : null
}
