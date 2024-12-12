import { createReduxStore } from '@/utils/redux'

export type TReduxStore = ReturnType<typeof createReduxStore>

export type TDispatch = TReduxStore['dispatch']

export type TApplicationState = ReturnType<TReduxStore['getState']>

export interface IThunkApi {
  state: TApplicationState
  dispatch: TDispatch
}
