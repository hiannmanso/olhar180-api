import { Router } from "express";
import {taskStatusPUT, tasksDELETE, tasksGET, tasksPOST, tasksPUT, tasksSingleGET} from '../controllers/tasks.controller'
import { validateSchema } from "../middlewares/validateSchema";
import {taskSchema} from '../schemas/task.schema'

const taskRouter = Router()
taskRouter.post('/tasks',validateSchema(taskSchema), tasksPOST)
taskRouter.get('/tasks',tasksGET)
taskRouter.get('/tasks/:id',tasksSingleGET)
taskRouter.put('/tasks/:id',validateSchema(taskSchema), tasksPUT)
taskRouter.put('/tasks/status/:id',taskStatusPUT)
taskRouter.delete('/tasks/:id',tasksDELETE)
export default taskRouter