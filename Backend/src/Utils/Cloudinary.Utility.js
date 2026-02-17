import "../env.js";
import {v2 as cloudinary} from 'cloudinary';
import fs from "fs";
import { loadEnvFile } from "process";

cloudinary.config({
   cloud_name :process.env.CLOUDINARY_CLOUD_NAME,
   api_key: process.env.CLOUDINARY_API_KEY,
   api_secret: process.env.CLOUDINARY_API_SECRET
})


const CLoudinaryUpload=async (localFilePath)=>{
console.log('inside cloudinary upload')
try{

   if(!localFilePath) return null;
   console.log("1st phase of file upload clear")
   const uploadFileResponse=await cloudinary.uploader.upload(localFilePath,{
    resource_type:"auto"
   });

   console.log("2nd phase of file upload clear")


   fs.unlinkSync(localFilePath);

   console.log("FIle uplodation sucessfully done")
   return uploadFileResponse;

}catch(error){
fs.unlinkSync(localFilePath);

console.log("CLOUDINARY UPLOAD FILE :: ERROR ::",error)
}
}


   const DeleteCloudinaryUpload=async (localFilePath)=>{
   console.log("inside file deletation")
   try
{
   if(!localFilePath) return null;
   const publicId =
   typeof file === "string"
   ? localFilePath
   : localFilePath.publicid;

   if(!publicId){
   console.log("publicId not found");
   return null;
   }
   console.log("Deleting publicId:", publicId);
   const result = await cloudinary.uploader.destroy(
   publicId,
   {
   resource_type: "image",
   invalidate: true
   }
   );
   if(result.result !== "ok"){
      console.log("Cloudinary delete failed:", result);
      return null;
      }
   console.log("File successfully deleted with result=>",result );
   return result;

}catch(error){
      console.log(" DELETING CLOUDINARY FILE :: ERROR :: ",error);
   }}

export {CLoudinaryUpload, DeleteCloudinaryUpload}