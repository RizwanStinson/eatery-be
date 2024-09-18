import { Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";
import User from "../models/userModel/userModel";
import { ExtendedRequest } from "../interfaces/extendedRequest";

const JWT_SECRET = process.env.JWT_SECRET || "";

export const authMiddleware = async (
  req: ExtendedRequest,
  res: Response,
  next: NextFunction
) => {
  const authHeaders = req.headers["authorization"];
  if (!authHeaders) {
    console.log("Authorization header missing");
    return res.sendStatus(403);
  }

  const token = authHeaders.split(" ")[1];
  if (!token) {
    return res.sendStatus(403);
  }

  if (!JWT_SECRET) {
    console.log("JWT Secret is missing");
    return res.sendStatus(500);
  }

  try {
    const verifiedToken = verify(token, JWT_SECRET) as {
      userId: string;
      email: string;
    };

    if (verifiedToken && verifiedToken.userId) {
      const user = await User.findById(verifiedToken.userId);
      if (!user) {
        console.log("User not found");
        return res.sendStatus(401);
      }

      req.user = user;
      next();
    } else {
      console.log("Invalid token format");
      return res.sendStatus(401);
    }
  } catch (error) {
    console.log("Token verification error:", error);
    res.sendStatus(401);
  }
};
