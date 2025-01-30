import { Router } from 'express'
import {
  createReaction,
  getReactions,
} from '../controllers/Reaction.controller'

export default (router: Router) => {
  router.post('/reaction', createReaction)
  router.get('/reactions', getReactions)
}
