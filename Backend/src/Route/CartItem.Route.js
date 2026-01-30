import { Router } from "express";
import { 
  AddToCart,
  YourCartItem,
  RemoveAllCartItem,
  RemoveSingleItemFromCart
 } from "../Controller/CartItem.Controller.js";
import { VerifyUser } from "../Middleware/index.js";

 const CartItemRouter=Router();

 CartItemRouter.post("/add-to-cart/:itemid",VerifyUser,AddToCart);
 CartItemRouter.post("/delete-cart-item/:itemid",VerifyUser,RemoveSingleItemFromCart);
 CartItemRouter.post("/empty-cart",VerifyUser,RemoveAllCartItem);
 CartItemRouter.get("/your-cart-item",VerifyUser,YourCartItem);

 export default CartItemRouter;