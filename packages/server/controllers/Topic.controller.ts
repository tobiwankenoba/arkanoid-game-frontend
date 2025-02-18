import { Request, Response } from 'express'
import { Topic, Comment, Reaction, User } from '../init'
import { asyncHandler } from '../utils/asyncHandler'
import { buildCommentTree } from '../utils/buildTree'

export const createTopic = asyncHandler(async (req: Request, res: Response) => {
  const { title, description } = req.body

  if (!title) {
    return res.status(400).json({ error: 'Title  are required' })
  }

  const newTopic = await Topic.create({ title, description })
  return res.status(201).json(newTopic)
})

export const getTopics = asyncHandler(async (_req: Request, res: Response) => {
  const topics = await Topic.findAll()
  return res.json(topics)
})

export const getTopicsWithComments = asyncHandler(
  async (_req: Request, res: Response) => {
    const topics = await Topic.findAll({
      include: [
        {
          model: Comment,
          as: 'comments',
          include: [
            { model: User, as: 'user' },
            { model: Reaction, as: 'reactions' },
          ],
        },
      ],
    })

    const formattedTopics = topics.map(topic => {
      const topicData = topic.get()
      return {
        ...topicData,
        comments: buildCommentTree(topicData.comments || []),
      }
    })

    res.json({ topics: formattedTopics })
  }
)

export const deleteTopic = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params
  const topic = await Topic.findByPk(id)

  if (!topic) {
    return res.status(404).json({ error: 'Topic not found' })
  }

  await topic.destroy()
  return res.status(200).json({ message: `Topic id=${id}deleted successfully` })
})
