import dotenv from 'dotenv'

import server from './app'

dotenv.config()

server.listen(process.env.PORT || 5000, () => {
	console.log(`Backend up on PORT:${process.env.PORT}`)
	console.log(`${process.env.DATABASE_URL}`)
	
})