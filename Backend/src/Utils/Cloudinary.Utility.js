import {v2 as cloudinary} from 'cloudinary';
import fs from "fs";

cloudinary.config({
   cloud_name :process.env.CLOUDINARY_CLOUD_NAME,
   api_key: process.env.CLOUDINARY_API_KEY,
   api_secret: process.env.CLOUDINARY_SECRET_KEY
})


const CLoudinaryUpload=async (localFilePath)=>{

try{

   if(!localFilePath) return null;

   const uploadFileResponse=await cloudinary.uploader.upload(localFilePath,{
    resource_type:"auto"
   });

   fs.unlinkSync(localFilePath);

   return uploadFileResponse;

}catch(error){

fs.unlinkSync(localFilePath);

console.log("CLOUDINARY UPLOAD FILE :: ERROR ::",error)
}
}


const DeleteCloudinaryUpload=async (localFilePath)=>{
try
{
if(!localFilePath) return null;
const removeReferance=await cloudinary.uploader.destroy(localFilePath.public_id,{resource_type:localFilePath.resource_type});
return removeReferance;
}catch(error){
console.log(" DELETING CLOUDINARY FILE :: ERROR :: ",error);
}
}

export {CLoudinaryUpload, DeleteCloudinaryUpload}