/* eslint-disable @typescript-eslint/no-explicit-any*/
import { Model } from 'sequelize-typescript'
import { ICommentAttributes } from 'modelsTypes'

export const buildCommentTree = (
  comments: Model<ICommentAttributes>[]
): ICommentAttributes[] => {
  const commentMap = new Map<number, any>()

  comments.forEach(comment => {
    commentMap.set(comment.id, { ...comment.get(), comments: [] })
  })

  const tree: ICommentAttributes[] = []

  comments.forEach(comment => {
    const commentData = commentMap.get(comment.id)
    if (commentData.commentId && commentMap.has(commentData.commentId)) {
      commentMap.get(commentData.commentId).comments.push(commentData)
    } else {
      tree.push(commentData)
    }
  })

  return tree
}
