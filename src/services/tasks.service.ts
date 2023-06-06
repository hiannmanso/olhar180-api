import { Tasks } from '../interfaces/tasks.interface';
import { decodeToken } from '../utils/token';
import taskRepository from './../repositories/task.repository'


async function insertNewTask(data:Tasks,token:string) {
    const infosToken = decodeToken(token)
    console.log(infosToken)

    const haveThisTask = await taskRepository.getTasksByTitle(data.title)
    for (const item of haveThisTask) {
        if(item.description === data.description && item.finalDate=== data.finalDate && item.priority === data.priority){
            throw {
                	status: 404,
                	message: `This task already exist.`,
                 	}
        }
    }
    console.log(haveThisTask)
    return await taskRepository.insert(data,infosToken.userID)
}

async function getAllTasks(token:string) {
    const infosToken = decodeToken(token)
    console.log(infosToken)
    const result = await taskRepository.getAll(infosToken.userID)
    if(result.length === 0){
        throw {
            status: 404,
            message: `You have no tasks registered`,
             }
    }
    return result
}

async function getByTaskId(id:number,token:string) {
   
    const infosToken = decodeToken(token)

    const result = await taskRepository.getById(id)
    if(!result){
        throw {
            status: 404,
			message: `Erro on load this task, please try again.`,
		}
    }
    if(result.accountId !== infosToken.userID){
        throw {
			status: 404,
			message: `This task is not yours, please try again.`,
		}
    }
    return result
}
async function editTask(data:Tasks,token:string) {
    const infosToken = decodeToken(token)
    console.log(infosToken)
    const infoTask = await taskRepository.getById(data.id) 
    if(!infoTask){
        throw {
            status: 404,
			message: `Erro on load this task, please try again.`,
		}
    }
    if(infoTask.accountId !== infosToken.userID){
        throw {
            status: 404,
			message: `This task is not yours, please try again.`,
		}
    }
    const result = await taskRepository.edit(data)
    return result
}

async function changeStatus(taskId:number,token:string) {
    const infosToken = decodeToken(token)
    let status = 'feito'
    console.log(infosToken)
    const infoTask = await taskRepository.getById(taskId)
    if(!infoTask){
        throw {
            status: 404,
			message: `Erro on load this task, please try again.`,
		}
    }
    if(infoTask.accountId !== infosToken.userID){
        throw {
            status: 404,
			message: `This task is not yours, please try again.`,
		}
    }
    if(infoTask.status === 'feito'){
        status = 'pendente'
    }
    const result = await taskRepository.editStatus(taskId,status) 
    return result
    
}
async function deleteTask(taskId:number,token:string) {
    const infosToken = decodeToken(token)
    console.log(infosToken)
    console.log(taskId)
    const infoTask = await taskRepository.getById(taskId)
    if(!infoTask){
        throw {
            status: 404,
			message: `Erro on load this task, please try again.`,
		}
    }
    if(infoTask.accountId !== infosToken.userID){
        throw {
            status: 404,
			message: `This task is not yours, please try again.`,
		}
    }
    const result = await taskRepository.deleteById(taskId)
    return result
}
const taskService={insertNewTask,getAllTasks,getByTaskId,editTask,changeStatus,deleteTask}
export default taskService