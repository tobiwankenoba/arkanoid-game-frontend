export type TTopic = {
  id: number
  title: string
  text: string
}

export type TCommentTopic = {
  id: number
  topicId: number
  text: string
}
