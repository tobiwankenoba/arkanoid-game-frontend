import { createSlice } from '@reduxjs/toolkit'

import { fetchUserInfo } from '@/thunks'
import { IUserInfo } from '@/types/auth'

interface IUserState {
  user: IUserInfo | null
  loading: boolean
  error: string | null
}

const initialState: IUserState = {
  user: null,
  loading: false,
  error: null,
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    resetUserState: () => initialState,
  },
  extraReducers: builder => {
    builder
      .addCase(fetchUserInfo.pending, state => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchUserInfo.fulfilled, (state, action) => {
        state.loading = false
        state.user = action.payload
      })
      .addCase(fetchUserInfo.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })
  },
})

export const { resetUserState } = userSlice.actions
export const userReducer = userSlice.reducer
