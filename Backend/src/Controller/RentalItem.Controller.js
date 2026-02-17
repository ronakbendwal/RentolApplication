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
console.log(req.body)
const {
  category,
  itemName,
  condition,
  // securityDeposite,
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
console.log(req.files)
if(!req.files || req.files.length<0){
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
const {itemId}=req.params;

if(!itemId){
  throw new ApiError(400,"Item Id Required")
}

if(!mongoose.Types.ObjectId.isValid(itemId)){
  throw new ApiError(400,"Invalid Item Id")
}

const currentitem=await RENTALITEM.findById(itemId).populate('owner');
if(!currentitem){
  throw new ApiError(404,"Item Not Found")
}

let userRating = null;

if (req.user) {
  const rated = currentitem.ratings.find(
    r=> r.user.toString() === req.user._id.toString()
  );
  userRating = rated ? rated.rating : null;
}

return res.status(200)
.json(
  new ApiResponse(
    200,
    {
      currentitem,
      userRating
    },
    "Current Item Fatched"
  )
)
})

const GetAllItem=AsyncHandle(async(req,res)=>{

  const {
    search,
    category,
  }=req.query;
const items=await RENTALITEM.find({}).sort({createdAt:-1});


if(items.length===0){
  return res.status(200)
  .json(
    new ApiResponse(
      200,
      items || [],
      "No Item Found"
    )
  )
}

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
    itemName,
    price,
    address,
    description,
    location,
    contactNumber,
    category,
    // newspecs,
    condition,
  } = req.body;

  console.log("from update data req body", req.body)

  let updateData = {};

  if (typeof itemName === "string" && itemName.trim() !== "") {
    updateData.itemName = itemName.trim();
  }

  if (typeof condition === "string" && condition.trim() !== "") {
    updateData.condition = condition.trim();
  }

  // if(typeof specs ==="object"){
  //   updateData.specs=newspecs;
  // }

  if (typeof description === "string" && description.trim() !== "") {
    updateData.description = description.trim();
  }

  if (typeof location === "string" && location.trim() !== "") {
    updateData.location = location.trim();
  }

  if (typeof category === "string" && category.trim() !== "") {
    updateData.category = category.trim();
  }

  if (typeof price!=undefined && price>=0) {
    updateData.price = Number(price);
  }

  if(typeof address==="string" && address.trim()!==""){
    updateData.address=address.trim();
  }

  if (contactNumber ==="string" && contactNumber.trim()!=="") {
    updateData.contactNumber = contactNumber.trim();
  }

  console.log(updateData);

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
const {itemId}=req.params;
if(!itemId){
  throw new ApiError(400,"Item ID Required")
}

const item=await RENTALITEM.findById(itemId);
if(!item){
  throw new ApiError(404,"Item Not Found")
}

if(item.owner?.toString() !== req.user?._id?.toString()){
  throw new ApiError(403,"You are not allowed to delete this item")
}

const deletedItemResponse=await RENTALITEM.findByIdAndDelete(itemId);

if(!deletedItemResponse){
  throw new ApiError(404,"item not deleted")
}

return res.status(200)
.json(
  new ApiResponse(
    200,
    {itemId},
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
  const {oldImages}=req.body;
  const parsedImages=JSON.parse(oldImages)

  console.log("parsed IMages", parsedImages);

  console.log("2nd phase of upload more images pass")

  if(!itemId){
    throw new ApiError(400,"item id required")
  }

  console.log("3rd phase of upload more images pass")

  const item=await RENTALITEM.findById(itemId)

  if(!item){
    throw new ApiError(404,"item not found")
  }

  console.log("4th phase of upload more images pass`")

  if(item.owner?.toString() !== req.user?._id?.toString()){
  throw new ApiError(403,"Not Allowed For Unauthorize User")
  }

  console.log("5th phase of upload more images pass")

  
  let oldImagesId=[];
  parsedImages?.map((img)=>{
    console.log(img.publicid)
    oldImagesId.push(img.publicid)
  })

  console.log("old images id" , oldImagesId);

  console.log("6th phase of upload more images pass")

  const deleteMissingImage=item.images.filter((img)=>!oldImagesId?.includes(img.publicid))

  console.log("delete Missing Images", deleteMissingImage);

  console.log("7th phase of upload more images pass")


  let deleteResponse;
  for(const img of deleteMissingImage){
    deleteResponse=await DeleteCloudinaryUpload(img);
  };

  console.log("deleteResponse", deleteResponse);
  console.log("8th phase of upload more images passs");


  const imagearray=[];

  if(req.files || req.files.length>0){
    console.log("inside new file uplodation");
    for(const file of req.files){
    const uploadedImageDetail=await CLoudinaryUpload(file?.path)
    if(!uploadedImageDetail){
      throw new ApiError(500,"images not upload")
    }
    imagearray.push({
      publicid:uploadedImageDetail?.public_id,
      url:uploadedImageDetail?.secure_url
  })}}

  console.log("imageArray", imagearray);

  console.log("9th phase of upload more images pass");

  const finalImages = [
    ...parsedImages,
  ...imagearray
  ];

  console.log("final images", finalImages);

  console.log("10th phase of upload more images pass")

  const uploadmoreimageinfo=await RENTALITEM.findByIdAndUpdate(
    itemId,
    {
      $set:{
        images:finalImages
      }
    },
    {new:true}
  )

  console.log("uploadmore images info", uploadmoreimageinfo);
  console.log("11th phase of upload more imagess pass")

  if(!uploadmoreimageinfo){
    throw new ApiError(500,"image not update yet")
  }

  console.log("12th phase of upload mor images pass");

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

const RateItem=AsyncHandle(async(req,res)=>{
  console.log("inside rateitem controller");

  const {itemid}=req.params;
  const {ratingValue}=req.body;

  const item = await RENTALITEM.findById(itemid)

  if(!item){
    throw new ApiError(404,"Item not found")
  }

  //Check Existed Rated Or Not
  let ratingExisted=await item.ratings.find((rated)=>(
    rated.user.toString() === req?.user._id.toString()
  ))

  if(ratingExisted){
    ratingExisted.rating=ratingValue
  }else{
    ratingExisted={
      user:req?.user._id,
      rating:ratingValue
    };
    item.ratings.push(ratingExisted)
  }

  //Calculate rating total and average

  let total=0;
  //Here we get the total rating in number
  item.ratings.forEach((data)=>(
    total+=data.rating
  ))
  //Here we calculate how many people rate the item;
  item.ratingCount=item.ratings.length;

  //Here we calculate the average rating of the item
  item.averageRating=(total/item.ratingCount).toFixed(1);

  await item.save();

  return res.status(200)
  .json(
    new ApiResponse(
      200,
      {
        user:req.user._id,
        rating:ratingValue,
        item
      },
      "Rating Subbmited Sucessfully"
    )
  )
})

const DeleteAllItem=AsyncHandle(async(req,res)=>{
const userid=req?.user?._id;
if(!userid){
  throw new ApiError(400,"User Id Required")
}

const deletedItemData=await RENTALITEM.deleteMany({owner:userid});

if(deletedItemData.deletedCount===0){
  throw new ApiError(404,"No items found to delete")
}

return res.status(200)
.json(
  new ApiResponse(
    200,
    {deletedItemData},
    "User All Item Sucessfully Deleted"
  )
)
})

const itemStatus=AsyncHandle(async(req,res)=>{
  const {itemId}=req?.params;
  
  const item=await RENTALITEM.findOne({
    _id:itemId,
    owner:req?.user._id
  })

  if(!item){
    throw new ApiError(404,"Item not found");
  }

  item.status=item.status==="Active" ? "Inactive" : "Active"
   await item.save();

   return res.status(200)
   .json(
    new ApiResponse(
      200,
      item,
      "Item Status Updated"
    )
   )


})

const FeedBack=AsyncHandle(async(req,res)=>{
  const {id}=req.params;
  const {comment}=req.body;
  
  if (!comment || !comment.trim()) {
    throw new ApiError(400, "Feedback comment required");
  }

  const item=await RENTALITEM.findById(id).populate('owner')
  if(!item){
    throw new ApiError(404,"Item Not Found")
  }

  console.log("item from feedback controller ",item)

  item.feedback.push({
    user:req?.user?._id,
    comment:comment.trim()
  });


  await item.save();

return res.status(201)
.json(
  new ApiResponse(
    201,
    item, 
    "Feedback successfully added"
  )
);
})

const DeleteFeedBack=AsyncHandle(async(req,res)=>{
  const {itemid,feedbackid}=req.params;

  const item =await RENTALITEM.findById(itemid)
  if(!item){
    throw new ApiError(404,"Item Not Found")
  }

  const feedback=item.feedback.id(feedbackid)
  console.log(feedback);

  if(!feedback){
    throw new ApiResponse(404,"feedback not found")
  }

  if(feedback.user.toString()!==req?.user?._id.toString()){
    throw new ApiError(403,"You can delete only your comments")
  }

  feedback?.deleteOne();
  await item.save();

  return res.status(200)
  .json(
    new ApiResponse(
      200,
      {},
      "Comment Sucessfully Deleted"
    )
  )
})

const GetFeedBack=AsyncHandle(async(req,res)=>{
  const {itemid}=req.params;
  const item=await RENTALITEM.findById(itemid)
  .select("feedback")
  .populate("feedback.user","fullname image")

  if(!item){
    throw new ApiError(404,"Item Not Found ")
  }

  const allUserFeedback =item.feedback.map(f=>({
    _id:f._id,
    user:f.user,
    comment:f.comment
  }));


  const sortedFeedback = item.feedback.sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );

  return res.status(200)
  .json(
    new ApiResponse(
      200,
      sortedFeedback,
      "All FeedBack Fatched"
    )
  )
})

const GetNearestItem=AsyncHandle(async(req,res)=>{
  const {city}=req.query

  if(!city){
    throw new ApiError(400, "city required")
  }

  const items = await RENTALITEM.find({
    location: { $regex: `^${city}$`, $options: "i" },
    status:"Active"
  })

  console.log(items)

  if(items.length===0){
    return res.status(200)
    .json(
      200,
      items,
      "no item fatched"
    )
  }

  return res.status(200)
  .json(
    new ApiResponse(
      200,
      items,
      "Near Item Sucessfully Fatched"
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
  RateItem,
  DeleteAllItem,
  itemStatus,
  FeedBack,
  GetFeedBack,
  DeleteFeedBack,
  GetNearestItem
}