import express from 'express';
import cookieParser from 'cookie-parser'
import {
  UserRouter,
  RentItemRouter,
  CartItemRouter,
} from './Route/index.js';

import cors from 'cors'


const app=express();
app.use(cookieParser())
app.use(express.json({limit:"50kb"}));
app.use(express.urlencoded({extended:true, limit:"16kb"}));
app.use(express.static("public"))
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true        
  })
);


app.use('/api/user',UserRouter);
app.use('/api/user/',RentItemRouter);
app.use('/api/user/',CartItemRouter)


export default app