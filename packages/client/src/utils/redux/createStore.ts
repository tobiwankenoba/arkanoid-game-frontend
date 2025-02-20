import { configureStore } from '@reduxjs/toolkit'

import { themeReducer, userReducer, leaderBoardReducer } from '@/slices'
import ssrReducer from '@/slices/ssrSlice/ssrSlice'

export function createReduxStore() {
  return configureStore({
    reducer: {
      user: userReducer,
      leaderBoard: leaderBoardReducer,
      ssr: ssrReducer,
      theme: themeReducer,
    },
  })
}
