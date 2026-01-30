import { VerifyUser, Multer } from "../Middleware/index.js";
import { Router } from "express";
import{
  CreateUser,
  UpdateUser,
  DeleteUser,
  LoginUser,
  LogOutUser,
  ChangeImage,
  ChangePassward,
  GetCurrentUser,
  DeleteImage,
  RefreshAccessToken,
  RemoveWishItem,
  AddToWishList,
  GetWishItem
} from '../Controller/User.Controller.js';


const UserRouter=Router();

UserRouter.post("/signup",Multer.single("image"),CreateUser);
UserRouter.post("/login",LoginUser);
UserRouter.post('/logout-user',VerifyUser,LogOutUser);
UserRouter.post("/refresh-access-token",VerifyUser,RefreshAccessToken);
UserRouter.post("/wish-list-item/:itemid",VerifyUser,AddToWishList);
UserRouter.delete("/remove-wished-item/:itemid",VerifyUser,RemoveWishItem);
UserRouter.delete("/delete-user",VerifyUser,DeleteUser);
UserRouter.delete("/deleteimage",VerifyUser,DeleteImage);
UserRouter.get("/get-wished-item",VerifyUser,GetWishItem);
UserRouter.get("/current-user",VerifyUser,GetCurrentUser);
UserRouter.patch("/update-user",VerifyUser,UpdateUser);
UserRouter.patch("/change-passward",VerifyUser,ChangePassward);
UserRouter.patch("/change-image",VerifyUser,Multer.single("image"),ChangeImage);

export default UserRouter;