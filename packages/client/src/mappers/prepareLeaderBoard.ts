import { ILeaderBoardState } from '@/types/leaderboard'

interface IParams {
  leaderBoard: {
    data: {
      name: string
      value: number
      grooveStreet: number
      userId: number
    }
  }[]
}

export const prepareLeaderBoard = ({
  leaderBoard,
}: IParams): ILeaderBoardState[] => {
  return leaderBoard.map(item => ({
    name: item.data.name,
    points: item.data.value,
    userId: item.data.userId,
    grooveStreet: item.data.grooveStreet,
  }))
}
