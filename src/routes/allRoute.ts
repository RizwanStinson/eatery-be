import { Router } from "express";
import userRouter from "./userRoute/userRoute";
import getProfileRouter from "./userRoute/getProfile";
import posRouter from "./posRoute/posRoute";

const router = Router();
router.use("/", userRouter);
router.use("/", getProfileRouter);
router.use("/", posRouter);

export default router;
