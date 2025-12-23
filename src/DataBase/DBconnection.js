import mongoose from 'mongoose'
import DBName from '../constant.js'

const DBurl=process.env.DB_URL;

const ConnectDB=async ()=>{
  
try{

    const connectinInstance=await mongoose.connect(process.env.DB_URL,{DBName});

    console.log('MONGODB CONNECTED || HOST ::',connectinInstance);

   }catch(error){
    console.log("DBconnect :: ERROR ::" , error)
    process.exit(1);
   }


}

export default ConnectDB;