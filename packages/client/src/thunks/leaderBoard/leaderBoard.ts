import { createAsyncThunk } from '@reduxjs/toolkit'

import { getLeaderBoard } from '@/api/leaderboard'
import {
  IGetLeaderBoardRequest,
  TLeaderBoardResponse,
} from '@/types/leaderboard'
import { IThunkApi } from '@/types/redux'

export const getLeaderBoardThunk = createAsyncThunk<
  TLeaderBoardResponse,
  IGetLeaderBoardRequest,
  IThunkApi
>('leaderBoard/getLeaderBoard', async params => {
  const result = await getLeaderBoard(params)

  return result
})
