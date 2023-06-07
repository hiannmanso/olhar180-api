import { NextFunction, Request, Response } from 'express'

export function handleError(
	error,
	req: Request,
	res: Response,
	next: NextFunction
) {
	console.table(error)
	if (error) {
		return res.status(error.status).send(error.message)
	}
	res.status(500)
}   