import dotenv from 'dotenv'

import server from './app.js'

dotenv.config()

server.listen(process.env.PORT || 5000, () => {
	console.log(`Backend npmup on PORT:${process.env.PORT}`)
	
})