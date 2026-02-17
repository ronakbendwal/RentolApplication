import {
  AsyncHandle,
  ApiError,
  ApiResponse,
  CLoudinaryUpload,
  DeleteCloudinaryUpload,
 } from "../Utils/index.js";
import {USER} from "../Model/User.Model.js";
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
  console.log("all complete")
  return {accessToken,refreshToken}
}catch(error){
  console.log(error)
  throw new ApiError(500,"Error While Generating Token's")
}
}

const CreateUser=AsyncHandle(async(req,res)=>{
  console.log("req body me aa raha he")
  const {username,email,passward,fullname,phonenumber,address}=req.body;

  console.log("1st path check")
  let uploadedfilepath="";
  if (!username || !email || !passward || !fullname || !phonenumber || !address) {
  throw new ApiError(400, "All Fields Are Required");
}

  console.log("2nd path check")


  const existedUser=await USER.findOne({
    $or:[{email},{username:username.toLowerCase()}]
  })

  if(existedUser){
    throw new ApiError(400,"User Already Exist")
  }

    console.log("3rd path check")


  if(req.file && req.file?.path){

    uploadedfilepath=await CLoudinaryUpload(req.file?.path);

  }

    console.log("4th path check")


  const userObject=await USER.create({
    username:username.toLowerCase(),
    email,
    fullname,
    passward,
    phonenumber,
    address,
    image:uploadedfilepath?.url || ""
  })

    console.log("5th path check")


  const userObjectReferance=await USER.findById(userObject._id)
  .select("-passward")

  if(!userObjectReferance){
    throw new ApiError(500,"Error While Creating User")
  }
  console.log("final path check")

  return res.status(201)
  .json(
    new ApiResponse(
      201,
      userObjectReferance,
      "User Sucessfully Created"
    )
  )
})//complete

const GetCurrentUser=AsyncHandle(async(req,res)=>{
const currentUser=await USER.findById(req?.user?._id).select("-passward");

if(!currentUser){
  console.log("condition failed")
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
})//complete

const LogOutUser=AsyncHandle(async(req,res)=>{
  
  console.log("in logout user")
  await USER.findByIdAndUpdate(
    
    req.user?._id,
    {
      $set:{
        refreshtoken:undefined
      }
    },)

    const options={
      httpOnly:true,
      secure: false,        // ⭐ localhost ke liye false
      sameSite: "lax"
    }

    console.log("complete logout")
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
})//complete

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
    httpOnly:false,
    sameSite: "lax"
  }

  console.log("all complete from login")
  return res.status(200)
  .cookie("accessToken",accessToken,options)
  .cookie("refreshToken",refreshToken, options)
  .json(
    new ApiResponse(
      200,
      loggedInUser,
      "User SucessFully Login" 
    )
  )
})//complete

const UpdateUser=AsyncHandle(async(req,res)=>{
console.log(req.body)
const {username,email,fullname,address,phonenumber}=req.body;

//check if theres field missing
if(!email || !username || !fullname || !address){
  throw new ApiError(401,"All Field Are Required");
}

if(phonenumber===undefined){
  throw new ApiError(401, "Phone number required")
}

//if theres no any fiels
if(!email && !username){
  throw new ApiError(400,"Nothing To Update")
}

const duplicateUSer=await USER.findOne({
  $or:[{username},{email}],
  _id:{$ne:req.user?._id}//current user ko chod ke bar karne ke liye ne is not equal
})

if(duplicateUSer){
  throw new ApiError(409,"Username or Email Already Exist Try Another")
} 

const updatedUser=await USER.findByIdAndUpdate(
  req.user?._id,
  {
   $set:{ 
    email,
    username,
    fullname,
    phonenumber,
    address
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
})//complete

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
})//complete

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

const newImageLocalPath=req?.file?.path;

console.log(newImageLocalPath)

const user=await USER.findById(req?.user?._id);

if(!user){
  throw new ApiError(404,"User Not Found")
}

if(!newImageLocalPath){
  throw new ApiError(400,"New Image Are Missing");
}

const previousImage=user?.image;

if(previousImage){
const deleteimage= await DeleteCloudinaryUpload(previousImage);
if(deleteimage){
  console.log("image sucesssfully deleted")
 }
}

const newImage=await CLoudinaryUpload(newImageLocalPath);

if(!newImage?.url){
  throw new ApiError(500,"Image Not Upload");
}

const newuploadedimageuser= await USER.findByIdAndUpdate(
  req.user?._id,
  {
    $set:{
      image:newImage,
    }
  },
  {
    new:true
  }).select("-passward -refreshtoken");

  if(!newuploadedimageuser){
    throw new ApiError(500,"image not upload")
  }

  console.log("change file sucessfully done")

  return res.status(200)
  .json(
    new ApiResponse(
     200,
     newuploadedimageuser,
    "image Sucessfully Uploaded"
  )
  )
})//complete

const DeleteImage=AsyncHandle(async(req,res)=>{
  
  // const user=await USER.findById(req.user?._id)

  const user=req?.user

  if(!user){
  throw new ApiError(404,"User Not Found")
  }

  const currentimage=user?.image;

  console.log("current image",currentimage)
  if(!currentimage){
    return res.status(200).json(
    new ApiResponse(
      200,
      user,
      "No image found to delete"
    )
  );
  }

  const DeletedImage= await DeleteCloudinaryUpload(currentimage)

  if(!DeletedImage){
    throw new ApiError(500,"image not deleted")
  }
  user.image=null;
  await user.save();
  

  return res.status(200)
  .json(
    new ApiResponse(
      200,
      user,
      "Image Sucessfully Deleted"
    )
  )
})//complete

const AddToWishList = AsyncHandle(async(req,res)=>{

 const { itemid } = req.params;

 if(!itemid){
   throw new ApiError(400,"Item Id Required");
 }

 const user =await USER.findById(req?.user?._id)

 if(!user){
  throw new ApiError(404,"User not found")
 }

 const dataExisted=user.wishitems.includes(itemid);

 let updatedUser;
 if(dataExisted){
   updatedUser=await USER.findByIdAndUpdate(
    req?.user?._id,
    {
      $pull:{ wishitems: itemid }
    },
    {new:true}
  ).populate("wishitems")
 }else{
    updatedUser = await USER.findByIdAndUpdate(
   req?.user._id,
   {
     $addToSet:{ wishitems:itemid }   // prevents duplicates
   },
   { new:true }
 ).populate("wishitems")
 }


;

 return res.status(200).json(
   new ApiResponse(
     200,
     updatedUser.wishitems,
     "Added To Favourites"
   )
 );
});//complete

const RemoveAllWishItem = AsyncHandle(async(req,res)=>{

  if(!req?.user?._id){
    throw new ApiError(404,"User not found")
  }

 const removeResponse =await USER.findByIdAndUpdate(
   req?.user?._id,
   { 
     $set:{
      wishitems:[]
     }
   },
   { new:true }
 );

 if(!removeResponse){
  throw new ApiError(404,"User not found in database")
 }

 return res.status(200).json(
   new ApiResponse(
     200,
     removeResponse.wishitems,
     "Wish List Empty Now"
   )
 );
});//complete

const GetWishItem = AsyncHandle(async(req,res)=>{

 const user = await USER.findById(req?.user._id)
 .populate("wishitems");

 return res.status(200).json(
   new ApiResponse(
     200,
     user.wishitems,
     "Favourite Items"
   )
 );
});//complete

const UpdateLocation=AsyncHandle(async(req,res)=>{
  console.log("inside set location controller ")
  const {data}=req.body;
  console.log(data)
  console.log(data?.data?.lon)
  console.log(data?.data.lat)
  if(data?.data.lat === undefined || data?.data.lon === undefined){
    throw new ApiError(400,"Latitude and Longitude required")
  }
  console.log("1st phase pass")

  const latitude = Number(data?.data?.lat);
  const longitude = Number(data?.data?.lon);

  if(isNaN(latitude) || isNaN(longitude)){
    throw new ApiError(400,"Invalid coordinates");
  }
  console.log("2nd phase pass")


  const locatoinUpdatedUser=await USER.findByIdAndUpdate(
    req?.user?._id,
    {
      $set:{
        fulllocation:data?.data,
        location:{
          type:"Point",
         coordinates: [parseFloat(longitude),parseFloat(latitude)]
        }
      }
    },
    {new:true}
  )

  if(!locatoinUpdatedUser){
    throw new ApiError(404,"User not found")
  }

  return res.status(200)
  .json(
    new ApiResponse(
      200,
      locatoinUpdatedUser,
      "User Location Sucessfully Updated"
    )
  )
})//complete


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
    DeleteImage,
    AddToWishList,
    RemoveAllWishItem,
    GetWishItem,
    UpdateLocation
  }