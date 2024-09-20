import express from "express";
import {
  createOrder,
  getAllOrders,
} from "../../controllers/posController/posController";
import { authMiddleware } from "../../middlewares/auth";

const posRouter = express.Router();

posRouter.post("/new", createOrder);

posRouter.get("/orders", getAllOrders);

export default posRouter;
