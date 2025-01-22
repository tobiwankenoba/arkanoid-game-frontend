import { configureStore } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'

import { userReducer } from '@/slices'
import { leaderBoardReducer } from '@/slices/leaderBoardSlice/leaderBoardSlice'
import ssrReducer from '@/slices/ssrSlice/ssrSlice'
import { TApplicationState, TDispatch } from '@/types/redux'

/* eslint-disable @typescript-eslint/naming-convention */
declare global {
  interface Window {
    APP_INITIAL_STATE: TApplicationState
  }
}

type TStore = ReturnType<typeof configureStore>
export const useAppDispatch: () => TDispatch = useDispatch

export function createReduxStore(): TStore {
  return configureStore({
    reducer: {
      user: userReducer,
      leaderBoard: leaderBoardReducer,
      ssr: ssrReducer,
    },
    preloadedState:
      typeof window === 'undefined' ? undefined : window.APP_INITIAL_STATE,
  })
}
