import { Router } from "express";
import { Multer, VerifyUser } from "../Middleware/index.js";
import { 
  rentOutItem,
  GetItem,
  GetAllItem,
  DeleteItem,
  GetYouritem,
  DeleteItemImage,
  UploadMoreImage,
  UpdateItem
 } from "../Controller/RentalItem.Controller.js";
const RentItemRouter=Router();

RentItemRouter.delete("/deleteimage/:itemId/:imageId",VerifyUser,DeleteItemImage);
RentItemRouter.post("/updateitem/:itemId",VerifyUser,UpdateItem);
RentItemRouter.delete("/deleteitem/:itemId",VerifyUser,DeleteItem);
RentItemRouter.post("/rentoutitem",VerifyUser,Multer.array("images",6),rentOutItem);
RentItemRouter.get("/getitem/:itemId",VerifyUser,GetItem);
RentItemRouter.get("/getallitem",VerifyUser,GetAllItem);
RentItemRouter.get("/getyouritem",VerifyUser,GetYouritem);
RentItemRouter.patch("/uploadimages/:itemId",VerifyUser,Multer.array("images",6),UploadMoreImage);


export default RentItemRouter;