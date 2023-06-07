import 'express-async-errors'
import { Router } from 'express'
import taskRouter from './task.router'
import authRouter from './auth.router' 
import {handleError} from '../middlewares/handleError'
const router = Router()
router.use(authRouter)
router.use("/tasks", taskRouter)
router.use(handleError)
export {router}