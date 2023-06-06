import Joi from 'joi'
import { User } from '../interfaces/auth.interface'

export const signUpSchema = Joi.object<User>({
	email: Joi.string().email().required(),
	password: Joi.string()
		.pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/)
		.required(),
	confirmPassword: Joi.ref('password'),
	username: Joi.string().required(),
})