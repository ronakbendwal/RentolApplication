import express from 'express';
import DBconnect from './DataBase/ConnedtDB.js';
import dotenv from 'dotenv';
dotenv.config();
const app =express();


DBconnect().then(()=>{
  app.listen(process.env.PORT,()=>{
    console.log("Server Started")
  }),
  app.on("error",()=>{
    console.log("Error In App Listening")
  })
}).catch((error)=>{
  console.log("MongoDB Connection Error ::",error)
})