import { Router } from 'express'
import {
  createReaction,
  getReactions,
  deleteReaction,
} from '../controllers/Reaction.controller'

export default (router: Router) => {
  router.post('/reaction', createReaction)
  router.get('/reactions', getReactions)
  router.delete('/reactions/:id', deleteReaction)
}
