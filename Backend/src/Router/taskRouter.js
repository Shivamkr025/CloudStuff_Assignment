import express from 'express';
import *as Task from '../Controller/task.js';
import { verifyToken } from '../Middleware/auth.js';

const router = express.Router()

router.post('/create/task' ,verifyToken , Task.createTask)

router.get('/view/All/Task' , verifyToken , Task.viewAllTask)

router.get('/find/Task/User' , verifyToken , Task.findTaskByUser)

router.put('/update/Task' , verifyToken , Task.updateTask)

router.delete('/delete/Task' , verifyToken , Task.deleteTask)


export default router