export type TLeaderBoardResponse200 = ILeaderBoardResponse[]

export type TLeaderBoardResponse400 = {
  reason: string
}

export type TLeaderBoardResponse =
  | TLeaderBoardResponse200
  | TLeaderBoardResponse400

export interface ILeaderBoardRequest {
  data: ILeaderBoardData
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

export interface ILeaderBoardResponse {
  data: ILeaderBoardData
}

export interface ILeaderBoard extends ILeaderBoardField {
  points: number
  name: string
  userId: number
}

export interface ILeaderBoardState {
  data: ILeaderBoard[]
  status: ELeaderBoardStatus
}

export enum ELeaderBoardStatus {
  Init = 'init',
  Loading = 'loading',
  Success = 'success',
  Failed = 'failed',
}

export interface ILeaderBoardField {
  groove: number
}

export interface ILeaderBoardData extends ILeaderBoardField {
  value: number
  name: string
  userId: number
}
