import asyncHandler from "express-async-handler";
import jwt, { JwtPayload } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import Users from "../models/userModel";
import HttpError from "../utils/HttpError";
import { FORBIDDEN, UNAUTHORIZED } from "../constants/http.codes";
import { JWT_SECRET } from "../constants/env.const";

interface AuthenticatedRequest extends Request {
  user?: any;
}

interface DecodedToken extends JwtPayload {
  userId: string;
}

export const protect = asyncHandler(
  async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    let token;

    // 1. Try to get token from Authorization header
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    // 2. If not in header, try to get from cookies
    if (!token && req.cookies && req.cookies.jwt) {
      token = req.cookies.jwt;
    }

    // 3. If no token found
    if (!token) {
      throw new HttpError("Not authorized, no token", UNAUTHORIZED);
    }

    // 4. Verify token
    try {
      const decoded = jwt.verify(token, JWT_SECRET) as DecodedToken;
      const user = await Users.findById(decoded.userId).select("-password");

      if (!user) {
        throw new HttpError("User not found", UNAUTHORIZED);
      }

      req.user = user;
      next();
    } catch (error) {
      throw new HttpError("Not authorized, token invalid", UNAUTHORIZED);
    }
  }
);


export const roleMiddleware = (allowedRoles: string[]) => {
  return (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    if (!req.user) {;
      throw new HttpError("Unauthorized: No user logged in", UNAUTHORIZED);
    }

    const { role } = req.user;
    if (!allowedRoles.includes(role)) {
      throw new HttpError("Access Denied: Insufficient permission", FORBIDDEN);
    }
    next();
  };
};
