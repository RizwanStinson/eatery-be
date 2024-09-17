import { Router } from "express";
import { login, signup } from "../../controllers/userController/userController";
import { authMiddleware } from "../../middlewares/auth";

const userRouter = Router();

userRouter.post("/signup", signup);
userRouter.post("/login", login);

export default userRouter;
