import express from "express";
import {
  createOrder,
  getAllOrders,
  getTopSellingItems,
} from "../../controllers/posController/posController";
import { authMiddleware } from "../../middlewares/auth";

const posRouter = express.Router();

posRouter.post("/new", createOrder);

posRouter.get("/orders", getAllOrders);

posRouter.get("/bestsell", getTopSellingItems);

export default posRouter;
