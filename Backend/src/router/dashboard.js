import express from 'express';
import { getDashboardData } from '../controller/dashboard.js';
import { verifyToken } from '../middleware/auth.js'; 
const router = express.Router();

router.get('/dashboard', verifyToken, getDashboardData);

export default router;
