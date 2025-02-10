import { Router } from 'express'
import {
  createComment,
  getComments,
  deleteComment,
} from '../controllers/Comment.controller'

export default (router: Router) => {
  router.post('/comment', createComment)
  router.post('/comments', getComments)
  router.delete('/comments/:id', deleteComment)
}
