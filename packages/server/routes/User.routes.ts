import { Router } from 'express'
import { createUser, getUsers } from '../controllers/User.controller'

export default (router: Router) => {
  router.post('/user', createUser)
  router.get('/users', getUsers)
}
