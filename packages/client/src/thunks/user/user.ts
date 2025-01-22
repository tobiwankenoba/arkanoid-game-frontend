import { createAsyncThunk } from '@reduxjs/toolkit'

import { getUserInfo } from '@/api/auth'
import { IUserInfo } from '@/types/auth'
import { IThunkApi } from '@/types/redux'

export const fetchUserInfo = createAsyncThunk<
  IUserInfo | null,
  void,
  IThunkApi
>('user/fetchUserInfo', async (_, { rejectWithValue }) => {
  try {
    const user = await getUserInfo()
    console.log('Resolved fetchuser', user)
    return user
  } catch (error) {
    console.log('fetchuser is rejected')
    return rejectWithValue(error)
  }
})
