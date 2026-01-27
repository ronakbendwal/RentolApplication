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
  RefreshAccessToken} from '../Controller/User.Controller.js';


const UserRouter=Router();

UserRouter.post("/signup",Multer.single("image"),CreateUser);
UserRouter.post("/login",LoginUser);
UserRouter.post('/logout-user',VerifyUser,LogOutUser);
UserRouter.post("/delete-user",VerifyUser,DeleteUser);
UserRouter.post("/deleteimage",VerifyUser,DeleteImage);
UserRouter.post("/refresh-access-token",VerifyUser,RefreshAccessToken);
UserRouter.get("/current-user",VerifyUser,GetCurrentUser);
UserRouter.patch("/update-user",VerifyUser,UpdateUser);
UserRouter.patch("/change-passward",VerifyUser,ChangePassward);
UserRouter.patch("/change-image",VerifyUser,Multer.single("image"),ChangeImage);

export default UserRouter;