import express from 'express';
import * as Project from '../controller/project.js';
import { verifyToken } from '../middleware/auth.js';
import Validator from '../middleware/validator.js';
import { projectValidation } from '../middleware/validation.js';

const router = express.Router()

router.post('/create/project' , verifyToken , Validator.validate(projectValidation) ,  Project.createProject)

router.get('/get/Project' , verifyToken , Project.getProject)

router.get('/get/All/Project' , Project.getAllProject)

router.put('/update/project' , verifyToken , Project.updateProject)

router.put('/cancel/project' , verifyToken , Project.cancelProject)

export default router
