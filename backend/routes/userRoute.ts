import { Router } from "express";
import { authUser, getCustomerUsers, logout, registerUser } from "../controllers/userController";

const userRoute = Router();

userRoute.get("/register", registerUser);

userRoute.get("/login", authUser)
userRoute.get("/login", logout)
userRoute.get("/", getCustomerUsers)
export default userRoute;