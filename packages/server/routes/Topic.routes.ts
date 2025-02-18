import { Router } from 'express'
import {
  createTopic,
  getTopicsWithComments,
  deleteTopic,
} from '../controllers/Topic.controller'

export default (router: Router) => {
  router.post('/topic', createTopic)
  router.get('/topics', getTopicsWithComments)
  router.delete('/topics/:id', deleteTopic)
}
