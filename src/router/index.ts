import { Router } from 'express'
import 'express-async-errors'
import { handleError } from '../middlewares/handleError'
import taskRouter from './task.router'
import authRouter from './auth.router'

const router = Router()
router.use(taskRouter)
router.use(authRouter)
router.get("/teste", (req, res) => {    
    res.send("OK")})
router.use(handleError)

export default router