import jwt from 'jsonwebtoken';
import { 
  AsyncHandle,
  ApiError
 } from '../Utils/index.js';
import { USER } from '../Model/User.Model.js';

const VerifyUser=AsyncHandle(async(req,res,next)=>{
  
const token=req.cookies?.accessToken ;

if(!token){
  throw new ApiError(401,"Token Not Found || Unauthorize User")
}

const decodetoken= jwt.verify(token,process.env.ACCESS_TOKEN_SECRET);

if(!decodetoken){
  throw new ApiError(404,"decoded token not found")
}

const user=await USER.findById(decodetoken?._id).select("-passward -refreshtoken")

if(!user){
  throw new ApiError(404,"Invalid Access Token")
}

req.user=user;
next();
})

export default VerifyUser;