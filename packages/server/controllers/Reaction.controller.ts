import { Request, Response } from 'express'
import { Reaction } from '../init'
import { asyncHandler } from '../utils/asyncHandler'

export const createReaction = asyncHandler(
  async (req: Request, res: Response) => {
    const { type, userId, commentId } = req.body
    if (!type || !userId || !commentId) {
      return res
        .status(400)
        .json({ error: 'type, userId, and commentId are required' })
    }
    const newReaction = await Reaction.create({ type, userId, commentId })
    return res.status(201).json(newReaction)
  }
)

export const getReactions = asyncHandler(
  async (_req: Request, res: Response) => {
    const reactions = await Reaction.findAll()
    return res.json(reactions)
  }
)
