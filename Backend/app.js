import express from 'express';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import userRouter from './src/Router/userRouter.js';

dotenv.config();

const app = express()
const PORT = process.env.PORT

app.use(express.json())
app.use(cookieParser())

app.use('/user', userRouter)


const mongodb = process.env.Connect

mongoose.connect(mongodb)
    .then(() => {
        console.log("connecting successfully...");
    }).catch((error) => {
        console.log(error);
    })

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
})
