import express from 'express';
import * as Users from '../Controller/user.js'
import { signupSchema } from '../Middleware/validation.js';
import Validator from '../Middleware/validator.js';
import { verifyToken } from '../Middleware/auth.js';

const router = express.Router()

router.post('/Register' ,Validator.validate(signupSchema), Users.userSignup) 

router.post('/login' , Users.userLogin)

router.get('/view/All' ,verifyToken , Users.allUser) 

router.put('/update' , verifyToken , Users.updateUser)

router.delete('/delete' ,verifyToken , Users.deleteUser)

export default router