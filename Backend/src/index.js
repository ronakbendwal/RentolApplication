import "./env.js";
import app from './App.js';
import DBconnect from './DataBase/ConnedtDB.js';

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