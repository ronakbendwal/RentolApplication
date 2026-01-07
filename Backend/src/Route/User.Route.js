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
  RefreshAccessToken} from '../Controller/User.Controller.js';


const UserRouter=Router();

UserRouter.post("/signup",Multer.single("image"),CreateUser);

UserRouter.post("/login",LoginUser);

UserRouter.get("/current-user",VerifyUser,GetCurrentUser);

UserRouter.post('/logout-user',VerifyUser,LogOutUser);

UserRouter.post("/delete-user",VerifyUser,DeleteUser);

UserRouter.patch("/update-user",VerifyUser,UpdateUser);

UserRouter.patch("/change-image",VerifyUser,Multer.single("image"),ChangeImage);

UserRouter.patch("/change-passward",VerifyUser,ChangePassward);

UserRouter.post("/refresh-access-token",VerifyUser,RefreshAccessToken);

export default UserRouter;