// packages/client/src/slices/ssrSlice.ts

import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

import { TApplicationState } from '@/types/redux'

export interface ISsrState {
  pageHasBeenInitializedOnServer: boolean
}

const initialState: ISsrState = {
  pageHasBeenInitializedOnServer: false,
}

export const ssrSlice = createSlice({
  name: 'ssr',
  initialState,
  reducers: {
    setPageHasBeenInitializedOnServer: (
      state,
      { payload }: PayloadAction<boolean>
    ) => {
      state.pageHasBeenInitializedOnServer = payload
    },
  },
})

export const selectPageHasBeenInitializedOnServer = (
  state: TApplicationState
) => state.ssr.pageHasBeenInitializedOnServer

export const { setPageHasBeenInitializedOnServer } = ssrSlice.actions

export default ssrSlice.reducer
