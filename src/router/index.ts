import { Router } from 'express'
import 'express-async-errors'
import { handleError } from '../middleware/handleError'


const router = Router()
router.get("/health", (req, res) => {    
    res.send("OK")})
router.use(handleError)

export default router