import dotenv from 'dotenv'
dotenv.config({path:'./.env'});
import app from './app.js';
import ConnectDB from './DataBase/DBconnection.js';
const port =process.env.PORT

ConnectDB()
.then(()=>{
  app.listen(port,()=>{
    console.log("app started")
  }),
  app.on("error",()=>{
    console.log("Error in app listening")
  })
}).catch((error)=>{
   console.log("MongoDB Connection Error :: ",error);
})