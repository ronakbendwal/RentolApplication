import {
  AsyncHandle,
  ApiError,
  ApiResponse,
  CLoudinaryUpload, 
  DeleteCloudinaryUpload
} from '../Utils/index.js';
import {
   RENTALITEM 
} from '../Model/Rentalitem.Model.js';
import mongoose from 'mongoose';


const rentOutItem=AsyncHandle(async(req,res)=>{
console.log("in the item upload controller");
const {
  category,
  itemName,
  condition,
  securityDeposite,
  price,
  contactNumber,
  location,
  address,
  description,
  specs,
}=req.body;
if([
  category,
  itemName,
  location,
  address,
  description,
].some((field)=>(
 !field?.trim()
))){
  throw new ApiError(400,"All Fields Are Required")
}
console.log("1st phase of item upload pass")


if(price == null){
 throw new ApiError(400,"Price required");
}

console.log("2nd phase of item upload pass")


if(!req.files || req.files.length===0){
  throw new ApiError(400,"image required ")
}

console.log("3rd phase of item upload pass")

const imagearray=[];
for(const file of req.files){
const uploadedImageDetail=await CLoudinaryUpload(file.path)
if(!uploadedImageDetail){
 console.log("error yaha he")
throw new ApiError(500,"error while image uplodation")
}
imagearray.push({
   publicid:uploadedImageDetail.public_id,
   url:uploadedImageDetail.secure_url
})
}
console.log("4th phase of item upload pass pass")

const uploadedItemObject=await RENTALITEM.create({
  category,
  itemName,
  condition,
  securityDeposite,
  price,
  contactNumber,
  location,
  address,
  images:imagearray,
  description,
  specs:specs || {},
  owner:req.user?._id
})
console.log("5th phase of item upload pass")

if(!uploadedItemObject){
  throw new ApiError(500,"Item Not Uploaded")
}
console.log("final phase of item upload pass")
return res.status(201)
.json(
  new ApiResponse(
    201,
    uploadedItemObject,
    "Item Sucessfully Posted"
  ))
})

const GetItem=AsyncHandle(async(req,res)=>{
console.log("inside get item controller")
const {itemId}=req.params;

if(!itemId){
  throw new ApiError(400,"Item Id Required")
}

console.log("1st phase of get item pass")

if(!mongoose.Types.ObjectId.isValid(itemId)){
  throw new ApiError(400,"Invalid Item Id")
}

console.log("2nd phase of get item pass")

const currentitem=await RENTALITEM.findById(itemId);
if(!currentitem){
  throw new ApiError(404,"Item Not Found")
}

console.log("final phase of get tiem pass")

return res.status(200)
.json(
  new ApiResponse(
    200,
    currentitem,
    "Current Item Fatched"
  )
)
})

const GetAllItem=AsyncHandle(async(req,res)=>{
  console.log("inside get all item controller")

  const {
    search,
    category,
  }=req.query;
const items=await RENTALITEM.find({}).sort({createdAt:-1});

console.log("1st phase of get all item pass")

if(items.length===0){
  throw new ApiError(404,"Items Not Found")
}

console.log("final phase of get all item pass")

return res.status(200)
.json(
  new ApiResponse(200,
    items,
    "All Item Fatched"
  )
)
})

const UpdateItem=AsyncHandle(async(req,res)=>{
  console.log("inside updateItem controller")
const {itemId}=req.params;
if(!itemId){
  throw new ApiError(400,"Item Id Required")
}
console.log("1st phase of update item pass")
const item=await RENTALITEM.findById(itemId);
if(!item){
  throw new ApiError(404,"Item Not Found")
}
console.log("2nd phase of update item pass")

if(item.owner?.toString() !== req.user?._id?.toString()){
  throw new ApiError(403,"Not Allowed For Unauthorize User")
}
console.log("3rd phase of update item pass")

  const {
    newitemname,
    newprice,
    newaddress,
    newdescription,
    newlocation,
    newcontactnumber,
    newcategory,
    newspecs,
    newcondition,
  } = req.body;

  const updateData = {};

  if (typeof newitemname === "string" && newitemname.trim() !== "") {
    updateData.itemName = newitemname.trim();
  }

  if (typeof newcondition === "string" && newcondition.trim() !== "") {
    updateData.condition = newcondition.trim();
  }

  if(typeof specs ==="object"){
    updateData.specs=newspecs;
  }

  if (typeof newdescription === "string" && newdescription.trim() !== "") {
    updateData.description = newdescription.trim();
  }

  if (typeof newlocation === "string" && newlocation.trim() !== "") {
    updateData.location = newlocation.trim();
  }

  if (typeof newcategory === "string" && newcategory.trim() !== "") {
    updateData.category = newcategory.trim();
  }

  if (typeof newprice==="number" && newprice>=0) {
    updateData.price = newprice;
  }

  if(typeof newaddress==="string" && newaddress.trim()!==""){
    updateData.address=newaddress;
  }

  if (newcontactnumber !== undefined) {
    updateData.contactNumber = newcontactnumber.trim();
  }


  if (Object.keys(updateData).length === 0) {
    throw new ApiError(400, "Nothing To Update");
  }

  console.log("4th phase where we update item is pass")

  const updateinfo = await RENTALITEM.findByIdAndUpdate(
    itemId,
    updateData,
    { new: true }
  );

  console.log("5th phase where we update data of the database")
  if(!updateinfo){
  throw new ApiError(404,"Item Info Not Updated")
  }

console.log("finallly update the item information")

return res.status(200)
.json(
  new ApiResponse(
    200,
    updateinfo,
    "Item Info Sucessfully Updated"
  )
)
})

const DeleteItem=AsyncHandle(async(req,res)=>{
  console.log("inside delete item controller")
const {itemId}=req.params;
if(!itemId){
  throw new ApiError(400,"Item ID Required")
}

console.log("1st phase of delete item pass")
const item=await RENTALITEM.findById(itemId);
if(!item){
  throw new ApiError(400,"Item Not Found")
}

console.log("2nd phase of delete item pass")

if(item.owner?.toString() !== req.user?._id?.toString()){
  throw new ApiError(403,"Not Allowed For Unauthorize User")
}
console.log("3rd phase of delete item pass")

const response=await RENTALITEM.findByIdAndDelete(itemId);
if(!response){
  throw new ApiError(404,"Item Not Deleted")
}
console.log("sucessfully delete the item")

return res.status(200)
.json(
  new ApiResponse(
    200,
    {},
    "Item Sucessfully Deleted"
  )
)
})

const GetYouritem=AsyncHandle(async(req,res)=>{
  console.log("inside get your item controller ")
  const userid=req.user?._id
  if(!userid){
    throw new ApiError(404,"User Not Found");
  }
  console.log("1st phase of get your item pass")

  const useritem=await RENTALITEM.find({owner:userid})

  if(useritem.length===0){
    return res.status(200)
    .json(
      new ApiResponse(
      200,
      useritem,
      "Upload Item First"
      )
    )
  }

  console.log("final phase of get your item pass")
  return res.status(200)
  .json(new ApiResponse(
    200,
    useritem,
    "User All Item Fetched"
  ))
})

const UploadMoreImage=AsyncHandle(async(req,res)=>{
  console.log("inside the update image controller")
  const {itemId}=req.params;
  if(!itemId){
    throw new ApiError(400,"item id required")
  }

  const item=await RENTALITEM.findById(itemId)
  if(!item){
    throw new ApiError(404,"item not found")
  }

  if(item.owner?.toString() !== req.user?._id?.toString()){
  throw new ApiError(403,"Not Allowed For Unauthorize User")
  }

  if(item?.images.length>6){
    throw new ApiError(500,"upload limit exceeded")
  }

  if(!req.files || req.files.length===0){
  throw new ApiError(400,"image required ")
  }

  const imagearray=[]

  for(const file of req.files){
    const uploadedImageDetail=await CLoudinaryUpload(file.path)
    if(!uploadedImageDetail){
      throw new ApiError(500,"images not upload")
    }
    imagearray.push({
      publicid:uploadedImageDetail.public_id,
      url:uploadedImageDetail.secure_url
  })}

  const uploadmoreimageinfo=await RENTALITEM.findByIdAndUpdate(
    itemId,
    {
      $push:{
        images:imagearray
      }
    },
    {new:true}
  )

  if(!uploadmoreimageinfo){
    throw new ApiError(500,"image not update yet")
  }

  console.log("sucessfully update item images")

  return res.status(200)
  .json(
    new ApiResponse(
      200,
      uploadmoreimageinfo,
      "Item Image Sucessfully Updated"
    )
  )
})

const DeleteItemImage=AsyncHandle(async(req,res)=>{

  console.log("inside delete item image controller ")

  const  {itemId,imageId}=req.params

  if(!itemId || !imageId){
    throw new ApiError(400,"itemId and ImageId required")
  }

  const item=await RENTALITEM.findById(itemId)
  if(!item){
    throw new ApiError(404,"item now found")
  }

  if(item?.owner?.toString() !== req?.user?._id?.toString()){
  throw new ApiError(403,"Not Allowed For Unauthorize User")
  }

  if(item?.images.length===0){
    throw new ApiError(400,"no images to delete")
  }

  if(item?.images.length===1){
    throw new ApiError(400,"images section cannot be empty")
  }

  const imageExisted= item.images.find((img)=>img.publicid ===imageId)

  if(!imageExisted){
    throw new ApiError(404,"Image not found")
  }

  const deletedfromcloudinary=await DeleteCloudinaryUpload(imageExisted)

  if(!deletedfromcloudinary){
    throw new ApiError(500,"Image not deleted from cloudinary")
  }

  const deletedfromdb=await RENTALITEM.findByIdAndUpdate(
    itemId,
    {
      $pull:{
        images:{publicid:imageId}
      }
    },
    {new :true}
  )

  if(!deletedfromdb){
    throw new ApiError(500,"image not deleted from db")
  }

  return res.status(200)
  .json(
    new ApiResponse(
      200,
      {},
      "image sucessfully deleted"
    )
  )

})

export {
  rentOutItem,
  UpdateItem,
  GetItem,
  DeleteItem,
  GetAllItem,
  GetYouritem,
  DeleteItemImage,
  UploadMoreImage,
}