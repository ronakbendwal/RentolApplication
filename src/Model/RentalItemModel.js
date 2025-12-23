import mongoose, { Schema,model } from "mongoose";

const RentalItemSchema=new Schema({
  ItemName:{
    type:String,
    required:true
  },
  Descreption:{
    type:String,
    required:true
  },
  price:{
    type:Number,
    default:0
  },
  ItemImage:{
    type:String,
    required:true
  },
  Location:{
    type:String,
    required:true
  },
  Owner:{
    type:mongoose.Types.ObjectId,
    ref:"USER"
  }
},{timestamps:true});

export const RENTALITEM=model("RENTALITEM",RentalItemSchema)