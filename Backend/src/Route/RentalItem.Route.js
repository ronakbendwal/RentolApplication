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
  RateItem,
  DeleteAllItem,
  itemStatus,
  FeedBack,
  GetFeedBack,
  DeleteFeedBack,
  GetNearestItem
 } from "../Controller/RentalItem.Controller.js";
const RentItemRouter=Router();

RentItemRouter.post("/rentoutitem",VerifyUser,Multer.array("images",6),rentOutItem);
RentItemRouter.post("/rate-item/:itemid",VerifyUser,RateItem)
RentItemRouter.post("/update-item-status/:itemId",VerifyUser,itemStatus)
RentItemRouter.post("/feedback/:id",VerifyUser,FeedBack)
RentItemRouter.get("/getfeedback/:itemid",VerifyUser,GetFeedBack)
RentItemRouter.get("/getitem/:itemId",VerifyUser,GetItem);
RentItemRouter.get("/getallitem",GetAllItem);
RentItemRouter.get("/getnearitem",VerifyUser,GetNearestItem)
RentItemRouter.get("/getyouritem",VerifyUser,GetYouritem);
RentItemRouter.patch("/updateitem/:itemId",VerifyUser,UpdateItem);
RentItemRouter.patch("/uploadimages/:itemId",VerifyUser,Multer.array("images",6),UploadMoreImage);
RentItemRouter.delete("/deleteitem/:itemId",VerifyUser,DeleteItem);
RentItemRouter.delete("/deleteimage/:itemId/:imageId",VerifyUser,DeleteItemImage);
RentItemRouter.delete("/deleteallitem",VerifyUser,DeleteAllItem)
RentItemRouter.delete("/deletefeedback/:itemid/:feedbackid",VerifyUser,DeleteFeedBack)



export default RentItemRouter;