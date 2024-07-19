import express from 'express';
import *as Task from '../controller/taskBoard.js';
import { verifyToken } from '../middleware/auth.js';

const router = express.Router()

router.get('/find/Task/User' , verifyToken , Task.findTaskByUser)


export default router