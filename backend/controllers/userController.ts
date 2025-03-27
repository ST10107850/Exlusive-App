import { Request, Response } from "express";
import expressAsyncHandler from "express-async-handler";
import Users from "../model/userModel";

interface AuthenticatedRequest extends Request {
    user?: { _id: string };
  }


export const registerUser = expressAsyncHandler(async(req: Request, res: Response)=>{
    res.send({message: "Signup success!"});
});

export const authUser = expressAsyncHandler(async(req: Request, res: Response)=>{
    res.send({message: "Login success!"});
})

export const logout = expressAsyncHandler(async(req: Request, res: Response)=>{
    res.send({message: "Logout success!"});
})

export const getCustomerUsers = expressAsyncHandler(
    async (req: AuthenticatedRequest, res: Response) => {
      const users = await Users.find({ role: "customer" });

      res.send({message: "Users found", data: users})
  
      res.status(200).json({ success: true, data: users });
    }
  );