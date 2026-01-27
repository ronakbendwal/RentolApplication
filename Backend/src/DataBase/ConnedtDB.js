import "../env.js";
import mongoose from 'mongoose';
import DB_NAME from '../Constant.js';
const DBconnect=async ()=>{
  try{
    const ConnsectionReferance=await mongoose.connect(process.env.DB_URI,{dbName:DB_NAME})
    console.log("MongoDB Connected :: Host :: ",ConnsectionReferance.connection.host)
  }catch(error){
    console.log("DB.Connect :: Error :: ",error)
    process.exit(1);
  }
}

export default DBconnect;