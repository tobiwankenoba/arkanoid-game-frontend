import { TApplicationState } from '@/types/redux'
import { TUser } from '@/types/user'

export const selectUser = (state: TApplicationState): TUser | null => {
  return state.user.user
}

export const selectUserId = (state: TApplicationState) => {
  return state.user.user?.id
}
