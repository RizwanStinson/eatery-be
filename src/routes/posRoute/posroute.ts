import express from "express";
import {
  createOrder,
  getAllOrders,
  getTopSellingItems,
} from "../../controllers/posController/posController";
import { authMiddleware } from "../../middlewares/auth";

const posRouter = express.Router();

posRouter.post("/new", authMiddleware(["Admin", "POSManager"]), createOrder);

posRouter.get("/orders", authMiddleware(["Admin", "POSManager"]), getAllOrders);

posRouter.get("/bestsell", getTopSellingItems);

export default posRouter;
