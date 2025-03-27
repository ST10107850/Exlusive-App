import { Request, Response } from "express";
import expressAsyncHandler from "express-async-handler";

export const registerUser = expressAsyncHandler(async(req: Request, res: Response)=>{
    res.send({message: "Signup success!"});
});

export const authUser = expressAsyncHandler(async(req: Request, res: Response)=>{
    res.send({message: "Login success!"});
})

export const logout = expressAsyncHandler(async(req: Request, res: Response)=>{
    res.send({message: "Logout success!"});
})