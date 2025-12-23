import mongoose,{Schema,model} from "mongoose";

const UserSchema=new Schema({
  Username:{
    type:String,
    required:true
  },
  Passward:{
    type:String,
    required:true
  },
  Email:{
    type:String,
    required:true
  },
  FullName:{
    type:String,
    required:true
  },
  RefreshToken:{
    type:String,
  },
  image:{
    type:String,
  }
},{timestamps:true})


export const USER=model("USER",UserSchema)

