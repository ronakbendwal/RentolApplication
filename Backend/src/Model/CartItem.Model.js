import { Schema,model} from "mongoose";

const CartSchema=new Schema({
  cartuser:{
    type:Schema.Types.ObjectId,
    ref:"USER",
    required:true
  },
  cartitem:[{
    type:Schema.Types.ObjectId,
    ref:"RENTALITEM",
  }],
},{timestamps:true})

export const CARTITEM=model("CARTITEM",CartSchema)