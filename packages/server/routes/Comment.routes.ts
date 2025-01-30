import { Router } from 'express'
import { createComment, getComments } from '../controllers/Comment.controller'

export default (router: Router) => {
  router.post('/comment', createComment)
  router.get('/comments', getComments)
}
