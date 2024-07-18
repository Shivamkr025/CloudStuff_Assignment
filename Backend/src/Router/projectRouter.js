import express from 'express';
import * as Project from '../Controller/project.js';
import { verifyToken } from '../Middleware/auth.js';

const router = express.Router()

router.post('/create/project' , verifyToken , Project.createProject)

router.get('/get/Project' , verifyToken , Project.getProject)

router.put('/update/project' , verifyToken , Project.updateProject)

router.put('/cancel/project' , verifyToken , Project.cancelProject)

export default router
