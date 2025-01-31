import { Router } from 'express'
import { createTheme, getTheme } from '../controllers/Theme.controller'

export default (router: Router) => {
  router.post('/theme', createTheme)
  router.get('/theme/:idUser', getTheme)
}
