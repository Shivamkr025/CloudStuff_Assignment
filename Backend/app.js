import express from 'express';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import userRouter from './src/router/userRouter.js';
import projectRouter from './src/router/projectRouter.js';
import taskRouter from  './src/router/taskRouter.js';
import taskBoard from './src/router/taskBoard.js';
import dashBoard from './src/router/dashboard.js'

dotenv.config();

const app = express()
const PORT = process.env.PORT

app.use(express.json())
app.use(cookieParser())

app.use('/user', userRouter)
app.use('/' , projectRouter)
app.use('/' , taskRouter)
app.use('/' , taskBoard)
app.use('/' , dashBoard)

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
