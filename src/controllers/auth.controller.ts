import { Request, Response } from 'express'
import { User } from '../interfaces/auth.interface.js'
import { signIN, signUp} from '../services/auth.service'


export async function signUpPOST(req: Request, res: Response) {
	const data: User = req.body
	console.log(data,'DATAAAAAAAAAAA')
	await signUp(data)
	res.status(201).send(`Your account have been created!`)
}

export async function signInGET(req: Request, res: Response) {
	const { email, password }: {email:string,password:string} = req.body

	const token = await signIN(email, password)
	res.status(200).send({token})
}

