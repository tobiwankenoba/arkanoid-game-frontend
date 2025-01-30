export type TUser = {
  id: number
  first_name: string
  second_name: string
  display_name: string
  phone: string
  login: string
  avatar: string
  email: string
}

export interface IUserState {
  user: TUser | null
  status: EUserStatus
}

export enum EUserStatus {
  Init = 'init',
  Success = 'success',
  Failed = 'failed',
  Loading = 'loading',
}
