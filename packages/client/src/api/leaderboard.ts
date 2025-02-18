import axios from 'axios'

import { BASE_URL } from '@/constants/api'
import { prepareLeaderBoard } from '@/mappers/prepareLeaderBoard'
import {
  IErrorResponse,
  IGetLeaderBoardRequest,
  ILeaderBoard,
  ILeaderBoardRequest,
  TLeaderBoardResponse,
  TLeaderBoardResponse200,
  TLeaderBoardResponse400,
} from '@/types/leaderboard'

export const sendLeaderBoardResult = async (
  params: ILeaderBoardRequest
): Promise<TLeaderBoardResponse | IErrorResponse> => {
  try {
    const { status, data } = await axios.post<TLeaderBoardResponse>(
      `${BASE_URL}/leaderboard`,
      params,
      {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      }
    )

    if (status !== 200) {
      throw new Error((data as TLeaderBoardResponse400).reason)
    }

    return data as TLeaderBoardResponse200
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

export const getLeaderBoard = async (
  params: IGetLeaderBoardRequest
): Promise<ILeaderBoard[]> => {
  try {
    const { status, data } = await axios.post<TLeaderBoardResponse>(
      `${BASE_URL}/leaderboard/all`,
      params,
      {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      }
    )

    if (status !== 200) {
      throw new Error((data as TLeaderBoardResponse400).reason)
    }

    return prepareLeaderBoard({ leaderBoard: data as TLeaderBoardResponse200 })
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      return []
    }
    throw new Error('Unexpected error occurred')
  }
}
