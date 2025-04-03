import { Router } from "express";
import { protect, roleMiddleware } from "../middleware/authMiddleware";
import { cartValidation } from "../middleware/validators/cartValidation";
import {
  createCart,
  deleteCart,
  getAllCarts,
  updateCartQuantity,
} from "../controllers/cartController";

const cartRoute = Router();

cartRoute.post(
  "/",
  protect,
  roleMiddleware(["customer"]),
  cartValidation,
  createCart
);
cartRoute.put(
  "/:id",
  protect,
  roleMiddleware(["customer"]),
  updateCartQuantity
);
cartRoute.delete("/:id", protect, roleMiddleware(["customer"]), deleteCart);
cartRoute.get("/", protect, roleMiddleware(["customer"]), getAllCarts);

export default cartRoute;
