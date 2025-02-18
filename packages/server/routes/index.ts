import { Router } from 'express'

import TopicRoutes from './Topic.routes'
import UserRoutes from './User.routes'
import CommentRoutes from './Comment.routes'
import ReactionRoutes from './Reaction.routes'
import ThemeRoutes from './Theme.routes'

const router = Router()

TopicRoutes(router)
UserRoutes(router)
CommentRoutes(router)
ReactionRoutes(router)
ThemeRoutes(router)

export default router
