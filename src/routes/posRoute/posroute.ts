import express from "express";
import {
  createOrder,
  getOrderByTable,
  getAllOrders,
} from "../../controllers/posController/posController";
import { authMiddleware } from "../../middlewares/auth";

const posRouter = express.Router();

posRouter.post("/new", authMiddleware(["Admin", "POSManager"]), createOrder);

posRouter.get(
  "/orders/:tableNO",
  authMiddleware(["Admin", "POSManager"]),
  getOrderByTable
);

posRouter.get("/orders", authMiddleware(["Admin", "POSManager"]), getAllOrders);

export default posRouter;
