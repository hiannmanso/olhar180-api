import Joi from 'joi'
import {Tasks} from '../interfaces/tasks.interface'

export const taskSchema = Joi.object<Tasks>({
    id: Joi.number(),
    title: Joi.string().required(),
    description: Joi.string().required(),
    finalDate: Joi.string().required(),
    priority: Joi.string().valid('baixa','media','alta')
})