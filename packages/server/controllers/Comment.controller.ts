import { Request, Response } from 'express'
import { Comment } from '../init'
import { asyncHandler } from '../utils/asyncHandler'

export const createComment = asyncHandler(
  async (req: Request, res: Response) => {
    const { content, commentId, topicId, userId } = req.body
    if (!content || !topicId || !userId) {
      return res
        .status(400)
        .json({ error: 'content, topicId and userId are required' })
    }
    const newComment = await Comment.create({
      content,
      commentId,
      topicId,
      userId,
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
