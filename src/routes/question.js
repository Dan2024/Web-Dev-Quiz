import { Router } from 'express'
import { getQuestionsByCategory } from '../controllers/question.js'

const router = Router()

router.get('/', getQuestionsByCategory)

export default router
