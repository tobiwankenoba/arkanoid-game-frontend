/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response, NextFunction } from 'express'
import { User } from '../init'

export const authenticateUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  const { userId } = req.body

  if (!userId) {
    return res.status(403).json({ error: 'User is not authenticated' })
  }

  const user = await User.findByPk(userId)
  if (!user) {
    return res.status(403).json({ error: 'User not found' })
  }

  next()
}
