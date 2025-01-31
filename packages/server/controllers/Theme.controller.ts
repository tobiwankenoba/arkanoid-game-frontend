import { Request, Response } from 'express'
import { Theme, User } from '../init'
import { asyncHandler } from '../utils/asyncHandler'

export const createTheme = asyncHandler(async (req: Request, res: Response) => {
  const { title, userId } = req.body

  if (!userId) {
    return res.status(400).json({ error: 'userId are required' })
  }

  const newTopic = await Theme.create({ title, userId })
  return res.status(201).json(newTopic)
})

export const getTheme = asyncHandler(async (req: Request, res: Response) => {
  const { idUser } = req.params

  if (!idUser) {
    return res.status(400).json({ error: 'userId are required' })
  }
  const user = await User.findOne({ where: { externalId: idUser } })
  const theme = await Theme.findByPk(user?.id)

  return res.status(200).json(theme)
})
