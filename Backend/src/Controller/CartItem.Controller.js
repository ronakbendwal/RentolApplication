import { CARTITEM } from "../Model/CartItem.Model.js";
import { RENTALITEM } from "../Model/Rentalitem.Model.js";
import {AsyncHandle,ApiError,ApiResponse} from "../Utils/index.js"

const AddToCart=AsyncHandle(async(req,res)=>{
const {itemid}=req.params;
if(!itemid){
  throw new ApiError(404,"Item Not Found");
}

const item=await RENTALITEM.findById(itemid);

if(!item){
  throw new ApiError(404,"Item not found");
}

const addresponse = await CARTITEM.findOneAndUpdate(
 { cartuser:req.user._id },
 {
   $addToSet:{ cartitem:item }
 },
 {
   upsert:true,
   new:true
 }
);

return res.status(201)
.json(new ApiResponse(
  200,
  addresponse,
  "Item Sucessfully Added To Cart"
))
})

const RemoveSingleItemFromCart=AsyncHandle(async(req,res)=>{
const {itemid}=req.params;
if(!itemid){
  throw new ApiError(404,"Item Not Found")
}

const cart=await CARTITEM.findOneAndUpdate(
  {cartuser:req?.user?._id},
  {
    $pull:{
      cartitem:itemid
    }
  },
  {new:true}
);

if(!cart){
  throw new ApiError(404,"cart not deleted")
}
return res.status(200)
.json(
  new ApiResponse(
    200,
    cart,
    "Item Sucessfully deleted from cart"
  )
)
})

const YourCartItem=AsyncHandle(async(req,res)=>{
const userid=req.user?._id
if(!userid){
  throw new ApiError(404,"User Not Found")
}
const cartdata=await CARTITEM.findOne({cartuser:userid})
 .populate("cartitem");
console.log(cartdata)
if(!cartdata || cartdata?.cartitem?.length===0){
  return res.status(200)
  .json(
    new ApiResponse(
      200,
      [],
      "Cart is Empty"
    )
  )
}

const items=cartdata.cartitem

return res.status(200)
.json(new ApiResponse(
  200,
  items,
  "Your Item Sucessfully Fatched"
))
})

const RemoveAllCartItem=AsyncHandle(async(req,res)=>{
const userid=req.user?._id
if(!userid){
  throw new ApiError(404,"User Not Found")
}

await CARTITEM.deleteOne({cartuser:userid})

return res.status(200)
.json(
  new ApiResponse(
    200,
    {},
    "ALL Item Deleted"
  )
)
})

export {
  AddToCart,
  RemoveAllCartItem,
  RemoveSingleItemFromCart,
  YourCartItem
}