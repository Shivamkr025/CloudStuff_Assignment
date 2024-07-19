import express from 'express';
import *as Task from '../controller/task.js';
import { verifyToken } from '../middleware/auth.js';
import { taskValidation } from '../middleware/validation.js';
import Validator from '../middleware/validator.js';

const router = express.Router()

router.post('/create/task' ,verifyToken ,Validator.validate(taskValidation) ,Task.createTask)

router.get('/view/All/Task' , Task.viewAllTask)

router.put('/update/Task' , verifyToken , Task.updateTask)

router.delete('/delete/Task' , verifyToken , Task.deleteTask)


export default router