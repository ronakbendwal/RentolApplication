import mongoose, { Schema,model } from "mongoose";

const RentalItemSchema=new Schema({
  category:{//for storing item category
    type:String,
    required:true
  },
  status:{//we can show the item status here 
   type:String,
   enum:["active","inactive","rented"],
   default:"active"
  },
  itemName:{//here our product or item name comes
    type:String,
    required:true
  },
  securityDeposite:{//secuirty money comes here
    type:Number,
    default:0
  },
  condition:{//here we store the condition of the item
    type:String,
    enum:["Good","Bad","Excellent"],
    default:"Good"
  },
  price:{//price will be comes here
    type:Number,
    default:0,
    required:true
  },
  contactNumber:{//contact number gonna be store here
    type:String,
    match:/^[0-9]{10}$/
  },
  location:{//for storing location
    type:String,
    required:true
  },
  address:{//for storing the address field data
    type:String,
    required:true
  },
  images:[{//images comes here
    publicid:{
      type:String,
      required:true
    },
    url:{
      type:String,
      required:true
    }
  }],
  description:{//we put description data here
    type:String,
    required:true
  },
  specs:{//for storing the different specification of all types of item
    type:mongoose.Schema.Types.Mixed,
    default:{}
  },
  owner:{//here our owner id comes to store
    type:mongoose.Schema.Types.ObjectId,
    ref:"USER",
    required:true
  },
  ratings:[{
    user:{
      type:mongoose.Schema.Types.ObjectId,
      ref:"USER"
    },
    rating:{
    type:Number,
    min:1,
    max:5,
    required:true
  },
  }],
  ratingCount:{
    type:Number,
    default:0
  },
  averageRating:{
    type:Number,
    default:0,
  }

},{timestamps:true});

export const RENTALITEM=model("RENTALITEM",RentalItemSchema)