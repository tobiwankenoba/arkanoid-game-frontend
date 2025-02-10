export type TTopic = {
  id: number
  title: string
  description: string
}

export type TCommentTopic = {
  id: number
  topicId: number
  content: string
}
