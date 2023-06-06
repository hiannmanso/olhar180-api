import bcrypt from 'bcrypt'
import authRepository from '../repositories/auth.repository'
import { generateToken } from '../utils/token'
import { User } from '../interfaces/auth.interface'

export async function signUp(
	data:User
) {
	const checkEmailIsValid = await authRepository.getByEmail(data.email)
	console.log(data)
	if (checkEmailIsValid) {
		throw {
			status: 401,
			message: `This email is already in use.`,
		}
	}

	await authRepository.insert(
		data.email,
		bcrypt.hashSync(data.password, 10),
		data.username,
	)
}

export async function signIN(email: string, password: string) {
	const checkEmailIsValid = await authRepository.getByEmail(email)
	if (!checkEmailIsValid) {
		throw {
			status: 404,
			message: `This email  is not registered.`,
		}
	}
	if (!bcrypt.compareSync(password, checkEmailIsValid.password)) {
		throw {
			status: 406,
			message: `Incorrect password or email.`,
		}
	}
	const token = generateToken(checkEmailIsValid.id)
	return token
}

