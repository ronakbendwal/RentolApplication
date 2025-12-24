import mongoose,{Schema,model} from "mongoose";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
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



//it is an middleware hash the bassward before save and safe the passward from unuseal hashing
UserSchema.pre("save",async function(next){
  if(!this.isModified(passward)) return next();

  this.passward=await bcrypt.hash(this.passward,10)
  next();
})

//it is an middleware user to chect the passward is correct or not
UserSchema.method.IsPasswardCorrect=async function(passward){
  return await bcrypt.compare(passward,this.passward)
}


//now we're gonna create custom method for the generation of access and refresh token
UserSchema.method.generateAccessToken=function(){
jwt.sign(
  {
    username:this.Username,
    fullname:this.FullName,
    email:this.Email,
    id:this._id
  },
  process.env.REFRESH_TOKEN_SECRET,
  {
    expiresIn:"1D"
  },
)
}
//refresh token generated
UserSchema.method.generateRefreshToken=function(){
  jwt.sign(
    {
      id:this._id
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn:"10D"
    }
  )
}
export const USER=model("USER",UserSchema)

