import { createAsyncThunk } from '@reduxjs/toolkit'

import { IThunkApi } from '@/types/redux'

export const sendFormThunk = createAsyncThunk<
  Record<string, unknown>,
  void,
  IThunkApi
>('user/getUser', async (_, _thunkApi) => {
  const { rejectWithValue } = _thunkApi

  try {
    //Здесь будет запрос в сервис за юзером
    const result = { statusCode: 200, data: {}, message: '' }

    if (result.statusCode === 200) {
      throw new Error(result.message)
    }

    return result.data
  } catch (e) {
    return rejectWithValue(e)
  }
})
