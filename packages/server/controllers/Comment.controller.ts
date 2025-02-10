import { Request, Response } from 'express'
import { Comment, User } from '../init'
import { asyncHandler } from '../utils/asyncHandler'

export const createComment = asyncHandler(
  async (req: Request, res: Response) => {
    const { content, commentId, topicId, userId } = req.body
    if (!content || !topicId || !userId) {
      return res
        .status(400)
        .json({ error: 'content, topicId and userId are required' })
    }
    const user = await User.findOne({ where: { externalId: userId } })
    const newComment = await Comment.create({
      content,
      commentId,
      topicId,
      userId: user?.id,
    })
    return res.status(201).json(newComment)
  }
)

export const getComments = asyncHandler(
  async (_req: Request, res: Response) => {
    const comments = await Comment.findAll()
    return res.json(comments)
  }
)

export const deleteComment = asyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.params
    const comment = await Comment.findByPk(id)

    if (!comment) {
      return res.status(404).json({ error: 'Comment not found' })
    }

    await comment.destroy()
    return res
      .status(200)
      .json({ message: `Comment id=${id}deleted successfully` })
  }
)
