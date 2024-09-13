import { Router } from "express";
import userRouter from "./userRoute/userRoute";
import getProfileRouter from "./userRoute/getProfile";

const router = Router();
router.use("/", userRouter);
router.use("/", getProfileRouter);

export default router;
