import { Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";
import User from "../models/userModel/userModel";
import { ExtendedRequest } from "../interfaces/extendedRequest";

const JWT_SECRET = process.env.JWT_SECRET || "";

export const authMiddleware = (
  allowedRoles: string[] = [],
  requiredOrganization?: string
) => {
  return async (req: ExtendedRequest, res: Response, next: NextFunction) => {
    try {
      const authHeaders = req.headers.authorization;
      if (!authHeaders) {
        return res
          .status(403)
          .json({ message: "Authorization header missing" });
      }

      const tokenParts = authHeaders.split(" ");
      if (tokenParts.length !== 2 || tokenParts[0] !== "Bearer") {
        return res
          .status(403)
          .json({ message: "Invalid authorization header format" });
      }

      const token = tokenParts[1];
      if (!token) {
        return res.status(403).json({ message: "Token not provided" });
      }

      if (!JWT_SECRET) {
        return res.status(500).json({ message: "JWT Secret not configured" });
      }

      let verifiedToken;
      try {
        verifiedToken = verify(token, JWT_SECRET) as {
          userId: string;
          userType: string;
          organization: string;
        };
      } catch (error) {
        return res.status(401).json({ message: "Invalid or expired token" });
      }

      const user = await User.findById(verifiedToken.userId);
      if (!user) {
        return res.status(401).json({ message: "User not found" });
      }

      if (allowedRoles.length && !allowedRoles.includes(user.userType)) {
        return res
          .status(403)
          .json({ message: "Forbidden: You are not authorized" });
      }

      if (
        requiredOrganization &&
        user.organizationName.toString() !== requiredOrganization
      ) {
        return res.status(403).json({
          message: "Forbidden: You are not part of the required organization",
        });
      }

      req.user = user;
      next();
    } catch (error) {
      console.error("Auth Middleware Error:", error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  };
};
