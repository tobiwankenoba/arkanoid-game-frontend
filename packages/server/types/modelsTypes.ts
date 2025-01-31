export interface ITopic {
  title: string
  description: string
  userId: number
}

export interface IUser {
  externalId: number
  login: string
  display_name: string
  avatar: string
}

export interface IComment {
  content: string
  commentId: string
  topicId: string
  userId: number
}

export interface IReaction {
  title: string
  commentId: number
  userId: number
}

export interface ICommentAttributes {
  id: number
  content: string
  commentId?: number | null // ID родительского комментария
  topicId: number
  userId: number
  user?: IUser
  reactions?: IReaction[]
  comments?: ICommentAttributes[] // Вложенные комментарии
}

export interface ITheme {
  title: string
  userId: number
}
