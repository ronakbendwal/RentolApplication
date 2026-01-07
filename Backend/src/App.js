import express from 'express';
import cookieParser from 'cookie-parser'
import UserRouter from './Route/User.Route.js';


const app=express();
app.use(cookieParser())
app.use(express.json({limit:"50kb"}));
app.use(express.urlencoded({extended:true, limit:"16kb"}));
app.use(express.static("public"))


app.use('/user',UserRouter)


export default app