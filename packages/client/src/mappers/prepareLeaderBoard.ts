import { ILeaderBoard, ILeaderBoardData } from '@/types/leaderboard'

interface IParams {
  leaderBoard: {
    data: ILeaderBoardData
  }[]
}

export const prepareLeaderBoard = ({
  leaderBoard,
}: IParams): ILeaderBoard[] => {
  return leaderBoard
    .map(item => ({
      name: item.data.name,
      points: item.data.value,
      userId: item.data.userId,
      groove: item.data.groove,
    }))
    .sort((a, b) => (a.points <= b.points ? 1 : -1))
    .slice(0, 5)
}
