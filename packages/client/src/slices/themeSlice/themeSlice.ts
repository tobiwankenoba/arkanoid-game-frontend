import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { IThemeState, TTheme } from '@/types/themes'

const initialState: IThemeState = { theme: 'white' }

/* istanbul ignore next */
const themeSlice = createSlice({
  initialState,
  name: 'theme',
  reducers: {
    setTheme: (state, action: PayloadAction<TTheme>) => {
      state.theme = action.payload
    },
    resetUserState: () => initialState,
  },
})

export const {
  reducer: themeReducer,
  actions: { setTheme, resetUserState },
} = themeSlice
