import { createSlice } from '@reduxjs/toolkit'

import { getLeaderBoardThunk } from '@/thunks/leaderBoard'
import {
  ELeaderBoardStatus,
  ILeaderBoard,
  ILeaderBoardState,
} from '@/types/leaderboard'

const initialState: ILeaderBoardState = {
  data: [],
  status: ELeaderBoardStatus.Init,
}

/* istanbul ignore next */
const leaderBoardSlice = createSlice({
  initialState,
  name: 'leaderBoard',
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getLeaderBoardThunk.pending, state => {
        state.data = []
        state.status = ELeaderBoardStatus.Loading
      })
      .addCase(getLeaderBoardThunk.fulfilled, (state, action) => {
        state.data = action.payload
        state.status = ELeaderBoardStatus.Success
      })
      .addCase(getLeaderBoardThunk.rejected, state => {
        state.data = []
        state.status = ELeaderBoardStatus.Failed
      })
  },
})

export const { reducer: leaderBoardReducer } = leaderBoardSlice
