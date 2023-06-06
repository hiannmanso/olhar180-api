import { Request, Response } from "express";
import taskService from "../services/tasks.service";
import { Tasks } from "../interfaces/tasks.interface";

export async function tasksPOST(req:Request,res:Response) {
    const { authorization } = req.headers
    const data:Tasks= req.body
        await taskService.insertNewTask(data,authorization)
        res.status(201).send('New task add.')
}

export async function tasksGET(req:Request,res:Response) {
    const { authorization } = req.headers
    const result = await taskService.getAllTasks(authorization)

    res.status(200).send(result)
}
export async function tasksSingleGET(req:Request,res:Response) {
    const { authorization } = req.headers
    const {id}:any = req.params
    console.log(id)
    const taskId = Number(id)
    
    if(isNaN(taskId)){
        throw {
            status: 404,
            message: `This id was not recognized`,
             }
    }
    const result = await taskService.getByTaskId(taskId,authorization)
    console.log(result)
    res.status(200).send(result)
}

export async function tasksPUT(req:Request, res:Response) {
    const { authorization } = req.headers
    const {id}:any = req.params
    const taskId = Number(id)
    
    if(isNaN(taskId)){
        throw {
            status: 404,
            message: `This id was not recognized`,
             }
    }
    const body:Tasks=req.body
    const data:Tasks = {...body,id:taskId}
    console.log(data)
    const result = await taskService.editTask(data,authorization)

    res.status(200).send(result)
    
}
export async function tasksDELETE(req:Request, res:Response) {
    const { authorization } = req.headers
    const {id}:any = req.params
    const taskId = Number(id)
    if(isNaN(taskId)){
        throw {
            status: 404,
            message: `This id was not recognized`,
             }
    }
    const result = await taskService.deleteTask(taskId,authorization)

    res.status(200).send(result)
    
}

export async function taskStatusPUT(req:Request,res:Response) {
       const { authorization } = req.headers
    const {id}:any = req.params
    const taskId = Number(id)
    if(isNaN(taskId)){
        throw {
            status: 404,
            message: `This id was not recognized`,
             }
    }
    const result = await taskService.changeStatus(taskId,authorization)

    res.status(200).send(result)
    
}

