import express from 'express'
import 'express-async-errors'
import cors from 'cors'
const server = express()

server.use(cors())
server.use(express.json())


export default server