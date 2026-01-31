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
  UpdateItem,
  RateItem
 } from "../Controller/RentalItem.Controller.js";
import { verify } from "jsonwebtoken";
const RentItemRouter=Router();

RentItemRouter.post("/rentoutitem",VerifyUser,Multer.array("images",6),rentOutItem);
RentItemRouter.post("/updateitem/:itemId",VerifyUser,UpdateItem);
RentItemRouter.post("/rate-item/:itemid",VerifyUser,RateItem)
RentItemRouter.get("/getitem/:itemId",VerifyUser,GetItem);
RentItemRouter.get("/getallitem",VerifyUser,GetAllItem);
RentItemRouter.get("/getyouritem",VerifyUser,GetYouritem);
RentItemRouter.patch("/uploadimages/:itemId",VerifyUser,Multer.array("images",6),UploadMoreImage);
RentItemRouter.delete("/deleteitem/:itemId",VerifyUser,DeleteItem);
RentItemRouter.delete("/deleteimage/:itemId/:imageId",VerifyUser,DeleteItemImage);



export default RentItemRouter;