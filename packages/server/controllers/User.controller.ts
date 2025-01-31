import { Request, Response } from 'express'
import { User } from '../init'
import { asyncHandler } from '../utils/asyncHandler'

export const createUser = asyncHandler(async (req: Request, res: Response) => {
  const { id, login, display_name, avatar } = req.body
  if (!id || !login || !display_name) {
    return res
      .status(400)
      .json({ error: 'Id, login and display_name are required' })
  }
  const newTopic = await User.create({
    externalId: id,
    login,
    display_name,
    avatar,
  })
  return res.status(201).json(newTopic)
})

export const getUsers = asyncHandler(async (_req: Request, res: Response) => {
  const users = await User.findAll()
  return res.json(users)
})
