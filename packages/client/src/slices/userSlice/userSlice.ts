import { createSlice } from '@reduxjs/toolkit'

import { fetchUserInfo } from '@/thunks'
import { EUserStatus, IUserState } from '@/types/user'

const initialState: IUserState = {
  user: null,
  status: EUserStatus.Init,
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchUserInfo.pending, state => {
        state.user = null
        state.status = EUserStatus.Loading
      })
      .addCase(fetchUserInfo.fulfilled, (state, action) => {
        state.user = action.payload
        state.status = EUserStatus.Success
      })
      .addCase(fetchUserInfo.rejected, state => {
        state.user = null
        state.status = EUserStatus.Failed
      })
  },
})

export const { reducer: userReducer } = userSlice
