import { TApplicationState } from '@/types/redux'
import { TUser } from '@/types/user'

export const selectUser = (state: TApplicationState): TUser | null => {
  return state.user
}
