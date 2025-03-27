import { Router } from "express";
import { authUser, logout, registerUser } from "../controllers/userController";

const userRoute = Router();

userRoute.get("/register", registerUser);

userRoute.get("/login", authUser)
userRoute.get("/login", logout)
export default userRoute;