import express from 'express'
import cors from 'cors'
import { router } from './router'


const server = express()

server.use(cors())
server.use(express.json())
server.use(router)
export default server