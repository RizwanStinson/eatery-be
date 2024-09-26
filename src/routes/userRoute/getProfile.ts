import express, { Request, Response } from "express";
import { authMiddleware } from "../../middlewares/auth";
const getProfileRouter = express.Router();

getProfileRouter.get(
  "/user-data",
  authMiddleware(["Admin"]), // Only Admin users allowed
  (req: Request, res: Response) => {
    const user = (req as any).user;

    if (!user) {
      return res.status(401).send("User not authenticated");
    }

    res.status(200).json({
      user: {
        userId: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        organizationName: user.organizationName,
        userType: user.userType,
        phone: user.phone,
        email: user.email,
      },
    });
  }
);

export default getProfileRouter;
