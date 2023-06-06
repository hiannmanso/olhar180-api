import Joi from 'joi'

export const signInSchema = Joi.object({
	email: Joi.string().email().required(),
	password: Joi.string()
		.pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/)
		.required(),
})