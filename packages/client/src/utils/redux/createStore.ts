import { configureStore } from '@reduxjs/toolkit'

import { userReducer } from '@/slices'
import { leaderBoardReducer } from '@/slices/leaderBoardSlice/leaderBoardSlice'

export function createReduxStore() {
  return configureStore({
    reducer: {
      user: userReducer,
      leaderBoard: leaderBoardReducer,
    },
  })
}
