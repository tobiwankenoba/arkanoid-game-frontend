import { ILeaderBoardState } from '@/types/leaderboard'
import { TApplicationState } from '@/types/redux'

export const selectLeaderBoard = (
  state: TApplicationState
): ILeaderBoardState[] => {
  return state.leaderBoard
}
