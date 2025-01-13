import { createSlice } from '@reduxjs/toolkit'

import { getUserInfo } from '@/api/auth'
import { TUser } from '@/types/user'

const initialState: TUser | null = await getUserInfo()

/* istanbul ignore next */
const userStatusSlice = createSlice({
  initialState,
  name: 'userStatus',
  reducers: {},
})

export const { reducer: userReducer } = userStatusSlice
