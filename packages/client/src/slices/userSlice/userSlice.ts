import { createSlice } from '@reduxjs/toolkit'

import { TUser } from '@/types/user'

const initialState: TUser | null = null

/* istanbul ignore next */
const userStatusSlice = createSlice({
  initialState,
  name: 'userStatus',
  reducers: {},
})

export const { reducer: userReducer } = userStatusSlice
