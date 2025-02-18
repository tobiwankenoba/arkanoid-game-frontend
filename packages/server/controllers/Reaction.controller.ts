import { Request, Response } from 'express'
import { Reaction } from '../init'
import { asyncHandler } from '../utils/asyncHandler'

export const createReaction = asyncHandler(
  async (req: Request, res: Response) => {
    console.log('CreateReaction is triggered')
    console.log('reqbody', req.body)
    const { title, userId, commentId } = req.body
    if (!title || !userId || !commentId) {
      return res
        .status(400)
        .json({ error: 'type, userId, and commentId are required' })
    }
    const newReaction = await Reaction.create({ title, userId, commentId })
    return res.status(201).json(newReaction)
  }
)

export const getReactions = asyncHandler(
  async (_req: Request, res: Response) => {
    const reactions = await Reaction.findAll()
    return res.json(reactions)
  }
)

export const deleteReaction = asyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.params
    const reaction = await Reaction.findByPk(id)

    if (!reaction) {
      return res.status(404).json({ error: 'Reaction not found' })
    }

    await reaction.destroy()
    return res.status(200).json({ message: `Reaction deleted successfully` })
  }
)
