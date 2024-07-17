import express from 'express';
import {userSignup , userLogin , allUser , updateUser , deleteUser} from '../Controller/user.js'
import { verifyToken } from '../Middleware/auth.js';

const router = express.Router()

router.post('/Register' , userSignup) 

router.post('/login' , userLogin)

router.get('/view/All' ,verifyToken , allUser) 

router.put('/update' , verifyToken , updateUser)

router.delete('/delete' ,verifyToken , deleteUser)

export default router