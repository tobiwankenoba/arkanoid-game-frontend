import axios from 'axios'

import {
  ISignUpRequest,
  ISignInRequest,
  ISignUpResponse,
  IErrorResponse,
} from '@/types/auth'

const BASE_URL = 'https://ya-praktikum.tech/api/v2'

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
