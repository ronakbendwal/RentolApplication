import mongoose, {Schema,model} from "mongoose";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';


const UserSchema=new Schema({
  username:{
    type:String,
    required:true
  },
  location:{
    type:{
      type:String,
      enum:["Point"],
      default:"Point"
    },
    coordinated:{
      type:[Number],
      required:true
    }
  },
  passward:{
    type:String,
    required:true
  },
  email:{
    type:String,
    required:true
  },
  fullname:{
    type:String,
    required:true
  },
  refreshtoken:{
    type:String,
  },
  image:{
    type:Object,
  },
  phonenumber:{
    type:Number,
  },
  address:{
    type:String,
  },
  wishitems:[{
    type:mongoose.Schema.Types.ObjectId,
    ref:"RENTALITEM"
  }]
},{timestamps:true})

//it is an middleware hash the bassward before save and safe the passward from unuseal hashing
UserSchema.pre("save", async function () {
  if (!this.isModified("passward")) return ;

  this.passward=await bcrypt.hash(this.passward,10);
});
//it is an middleware user to chect the passward is correct or not
UserSchema.methods.IsPasswardCorrect=async function(passward){
  return await bcrypt.compare(passward,this.passward)
}
//now we're gonna create custom method for the generation of access and refresh token
UserSchema.methods.generateAccessToken=function(){
return jwt.sign(
  {
    _id:this._id,
    username:this.username,
    fullname:this.fullname,
    email:this.email
  },
  process.env.ACCESS_TOKEN_SECRET,
  {
    expiresIn:"1d",
  });
}
//refresh token generated
UserSchema.methods.generateRefreshToken=function(){
 return jwt.sign(
    {
      _id:this._id,
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn:"10d"
    }
  )
}
export const USER=model("USER",UserSchema)

