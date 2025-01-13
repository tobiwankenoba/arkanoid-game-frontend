export type TLeaderBoardResponse200 = ILeaderBoardState[]

export type TLeaderBoardResponse400 = {
  reason: string
}

export type TLeaderBoardResponse =
  | TLeaderBoardResponse200
  | TLeaderBoardResponse400

export interface ILeaderBoardRequest {
  data: {
    RatingFieldName: string
    value: number
    name: string
  }
  ratingFieldName: string
  teamName: string
}

export interface IErrorResponse {
  status: number
  reason: string
}

export interface IGetLeaderBoardRequest {
  teamName: string
  ratingFieldName: string
  cursor: number
  limit: number
}

export interface ILeaderBoardState {
  points: number
  name: string
}
