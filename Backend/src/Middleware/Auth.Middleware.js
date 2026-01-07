import jwt from 'jsonwebtoken';
import { 
  AsyncHandle,
  ApiError
 } from '../Utils/index.js';
import { USER } from '../Model/index.js';

const VerifyUser=AsyncHandle(async(req,res,next)=>{
console.log('in the auth middleware')
const token=req.cookies?.accessToken ;
console.log(token)
if(!token){
  throw new ApiError(401,"Token Not Found || Unauthorize User")
}

const decodetoken= jwt.verify(token,process.env.ACCESS_TOKEN_SECRET);
if(decodetoken){
  console.log('get decoded token')
}
const user=await USER.findById(decodetoken?._id).select("-passward -refreshtoken")

if(!user){
  throw new ApiError(404,"Invalid Access Token")
}
console.log(user)
req.user=user;
console.log('complete auth middleware')
next();
})

export default VerifyUser;