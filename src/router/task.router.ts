import { Router } from "express";
import {taskStatusPUT, tasksDELETE, tasksGET, tasksPOST, tasksPUT, tasksSingleGET} from '../controllers/tasks.controller'
import { validateSchema } from "../middlewares/validateSchema";
import {taskSchema} from '../schemas/task.schema'

const taskRouter = Router()
taskRouter.post('',validateSchema(taskSchema), tasksPOST)
taskRouter.get('',tasksGET)
taskRouter.get('/:id',tasksSingleGET)
taskRouter.put('/:id',validateSchema(taskSchema), tasksPUT)
taskRouter.put('/status/:id',taskStatusPUT)
taskRouter.delete('/:id',tasksDELETE)
export default taskRouter