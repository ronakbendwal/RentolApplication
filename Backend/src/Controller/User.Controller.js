import {
  AsyncHandle,
  ApiError,
  ApiResponse,
  CLoudinaryUpload,
  DeleteCloudinaryUpload
 } from "../Utils/index.js";
import {USER} from "../Model/index.js";
import jwt from "jsonwebtoken";
const GenerateAccessRefreshToken= async(userId)=>{
try{
  
  const user=await USER.findById(userId);
  const accessToken=user.generateAccessToken();
  console.log("first half complete")
  const refreshToken=user.generateRefreshToken();
  console.log("secont half complete")
  user.refreshtoken=refreshToken;
  await user.save({validateBeforeSave:false});
  return {accessToken,refreshToken}
}catch(error){
  console.log(error)
  throw new ApiError(500,"Error While Generating Token's")
}
}

const CreateUser=AsyncHandle(async(req,res)=>{
  const {username,email,passward,fullname}=req.body;

  let uploadedfilepath="";

  if(req.file && req.file?.path){

    uploadedfilepath=await CLoudinaryUpload(req.file?.path);

  }
   
  if([username,email,passward,fullname].some((field)=>{
    field?.trim()===""
  }) ){
    throw new ApiError(400,"All Field Are Required");
  }

  const existedUser=await USER.findOne({
    $or:[{email},{username}]
  })

  if(existedUser){
    throw new ApiError(400,"User Already Exist")
  }

  const userObject=await USER.create({
    username:username.toLowerCase(),
    email,
    fullname,
    passward,
    image:uploadedfilepath?.url
  })

  const userObjectReferance=await USER.findById(userObject._id)
  .select("-passward -refreshtoken")

  if(!userObjectReferance){
    throw new ApiError(500,"Error While Creating User")
  }

  return res.status(201)
  .json(
    new ApiResponse(
      201,
      userObjectReferance,
      "User Sucessfully Created"
    )
  )
})

const GetCurrentUser=AsyncHandle(async(req,res)=>{
  console.log("aa raha he current user me " )
const currentUser=await USER.findById(req.user?._id).select("-passward");
if(!currentUser){
  throw new ApiError(401,"User Not Authenticate")
}

return res.status(200).
json(
  new ApiResponse(
    200,
    currentUser,
    "User Geted Sucessfully"
  )
)
})

const LogOutUser=AsyncHandle(async(req,res)=>{
  await USER.findByIdAndUpdate(
    req.user?._id,
    {
      $set:{
        refreshtoken:undefined
      }
    },)

    const options={
      httpOnly:true,
      secure:true
    }

    return res.status(200)
    .clearCookie("refreshToken",options)
    .clearCookie("accessToken",options)
    .json(
      new ApiResponse(
        200,
        {},
        "User Sucessfully Logout"
      )
    )
})

const LoginUser=AsyncHandle(async(req,res)=>{
  //get user info
  const {email,passward,username}=req.body;

  if(!username && !email){
    throw new ApiError(400,"Username or Email Required")
  }


  const userInfo=await USER.findOne({
    $or:[{username},{email}]
  });

  if(!userInfo){
    throw new ApiError(404,"User Not Exist In The Record")
  }

   if(!passward){
    throw new ApiError(400,"Passward required");
  }

  const checkPassward=await userInfo.IsPasswardCorrect(passward);
  if(!checkPassward){
    throw new ApiError(401,"Enter Correct Passward")
  }

  const {accessToken,refreshToken}=await GenerateAccessRefreshToken(userInfo?._id);

  const loggedInUser=await USER.findById(userInfo?._id).select("-passward -refreshtoken")

  if(!loggedInUser){
    throw new ApiError(401,"User Not LogedIn")
  }

  const options={
    secure:true,
    httpOnly:true
  }

  return res.status(200)
  .cookie("accessToken",accessToken,options)
  .cookie("refreshToken",refreshToken, options)
  .json(
    new ApiResponse(
      200,
      {
        user:loggedInUser
      },
      "User SucessFully Login" 
    )
  )
})

const UpdateUser=AsyncHandle(async(req,res)=>{
const {newusername,newemail}=req.body;
//check if theres field missing
if(!newemail || !newusername){
  throw new ApiError(401,"All Field Are Required");
}

//if theres no any fiels
if(!newemail && !newusername){
  throw new ApiError(400,"Nothing To Update")
}

const duplicateUSer=await USER.findOne({
  $or:[{newusername},{newemail}],
  _id:{$ne:req.user?._id}//current user ko chod ke bar karne ke liye ne is not equal
})

if(duplicateUSer){
  throw new ApiError(409,"Username or Email Already Exist")
} 

const updatedUser=await USER.findByIdAndUpdate(
  req.user?._id,
  {
   $set:{ email:newemail,
    username:newusername
  }
  },
  {new :true}
).select("-passward -refreshtoken")

if(!updatedUser){
  throw new ApiError(404,"User Info Not Update")
}

return res.status(200)
.json(
  new ApiResponse(
    200,
    updatedUser,
    "User Sucessfully Updated"
  )
)
})

const ChangePassward=AsyncHandle(async(req,res)=>{
  const {newpassward,oldpassward}=req.body;

  if(newpassward === oldpassward){
    throw new ApiError(400,"New Passward Must Be Different")
  }

  if(!newpassward || !oldpassward){
    throw new ApiError(400,"New And Old Both Passward Required")
  }
  const user=await USER.findById(req.user?._id)

  if(!user){
    throw new ApiError(401,"USER NOT FOUND")
  }

  const verifyOldPassward=await user.IsPasswardCorrect(oldpassward)

  if(!verifyOldPassward){
    throw new ApiError(401,"Enter Correct Passward")
  }

  user.passward=newpassward;
  await user.save({validateBeforeSave:false})

  return res.status(200)
  .json(new ApiResponse(
    200,
    {},
    "Passward Sucessfully Changes"
  ))
})

const DeleteUser=AsyncHandle(async(req,res)=>{
  //get user id from the req.body
  console.log("delete me aa raha he ")
  const userid=req.user?._id;

  console.log(userid)
  if(!userid){
    throw new ApiError(401,"User Not Authenticate")
  }

  const deletedUser=await USER.findByIdAndDelete(userid)

  
  if(!deletedUser){

    throw new ApiError(404,"User Not found")
  }
  const options={
    secure:true,
    httpOnly:true
  }
  return res.status(200)
  .clearCookie("accessToken",options)
  .clearCookie("refreshToken",options)
  .json(
    new ApiResponse(
      200,
      {},
      "User Sucessfully Deleted"
    )
  )
})

const RefreshAccessToken=AsyncHandle(async(req,res)=>{

  const oldRefreshToken=req.cookies?.refreshToken || req.body?.refreshToken
  if(!oldRefreshToken){
    throw new ApiError(401,"AccessToken Required")
  }
  try{
    const decodedToken=jwt.verify(oldRefreshToken,process.env.REFRESH_TOKEN_SECRET);

    const user=await USER.findById(decodedToken?._id).select("-passward refreshtoken");

    if(!user){
      throw new ApiError(401,"Invalid RefreshToken")
    }

    if(oldRefreshToken != user?.refreshtoken){
      throw new ApiError(404,"Refresh Token Is Expired Or Used")
    }

    const {refreshToken,accessToken}=user.GenerateAccessRefreshToken(user?._id);

    const options={
      secure:true,
      httpOnly:true
    }

    return res.status(200)
    .cookie("accessToken",accessToken,options)
    .cookie("refreshToken",refreshToken,options)
    .json(
      new ApiResponse(
        200,
        {
          accessToken
        },
        "Token Refreshes"
      )
    )

  }catch(error){
    throw new ApiError(500,"Server Error While Generating Access Token" ,error)
  }

})

const ChangeImage=AsyncHandle(async(req,res)=>{

  console.log("andar aa gaye")
const newImageLocalPath=req.file?.path;
console.log(newImageLocalPath)
const user=await USER.findById(req.user?._id)
if(!user){
  throw new ApiError(404,"User Not Found")
}
if(!newImageLocalPath){
  throw new ApiError(400,"New Image Are Missing");
}
const previousImage=user?.image;
 const deleteimage= await DeleteCloudinaryUpload(previousImage)
 if(deleteimage){
  console.log("image sucesssfully deleted")
 }

const newImage=await CLoudinaryUpload(newImageLocalPath);
if(!newImage?.url){
  throw new ApiError(500,"Image Not Upload");
}
console.log(newImage);
const uploadedReferance= await USER.findByIdAndUpdate(
  req.user?._id,
  {
    $set:{
      image:newImage,
    }
  },
  {
    new:true
  }).select("-passward -refreshtoken");
  return res.status(200)
  .json(
    new ApiResponse(
     200,
    uploadedReferance,
    "image Sucessfully Uploaded"
  )
  )
})

  export {
    CreateUser,
    LoginUser,
    LogOutUser,
    DeleteUser,
    GetCurrentUser,
    UpdateUser,
    ChangePassward,
    RefreshAccessToken,
    ChangeImage,
  }