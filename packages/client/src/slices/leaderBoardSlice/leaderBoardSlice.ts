import { createSlice } from '@reduxjs/toolkit'

import { getLeaderBoard } from '@/api/leaderboard'
import { ILeaderBoardState } from '@/types/leaderboard'

const initialState: any = getLeaderBoard({
  teamName: 'groove',
  ratingFieldName: 'grooveStreet',
  cursor: 0,
  limit: 10,
})

/* istanbul ignore next */
const leaderBoardSlice = createSlice({
  initialState,
  name: 'leaderBoard',
  reducers: {},
})

export const { reducer: leaderBoardReducer } = leaderBoardSlice
