import { Router } from 'express'
import { getUsers } from '../controllers/users.js'

const router = new Router()

router.get('/', getUsers)

export default router
