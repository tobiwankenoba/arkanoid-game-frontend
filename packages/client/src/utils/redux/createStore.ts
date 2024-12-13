import { configureStore } from '@reduxjs/toolkit'

import { userReducer } from '@/slices'

export function createReduxStore() {
  return configureStore({
    reducer: {
      user: userReducer,
    },
  })
}
