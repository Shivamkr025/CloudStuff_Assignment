import express from 'express';
import * as Users from '../controller/user.js'
import { signupValidation } from '../middleware/validation.js';
import { loginValidation } from '../middleware/validation.js';
import Validator from '../middleware/validator.js';
import { verifyToken } from '../middleware/auth.js';

const router = express.Router()

router.post('/Register' ,Validator.validate(signupValidation), Users.userSignup) 

router.post('/login' , Validator.validate(loginValidation) , Users.userLogin)

router.get('/view/All' ,verifyToken , Users.allUser) 

router.put('/update' , verifyToken , Users.updateUser)

router.delete('/delete' ,verifyToken , Users.deleteUser)

export default router