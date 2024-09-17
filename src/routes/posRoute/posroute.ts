import express from "express";
import {
  createOrder,
  getOrderByTable,
  updateTableStatus,
  getAllOrders,
  deleteOrder,
} from "../../controllers/posController/posController";
import { authMiddleware } from "../../middlewares/auth";

const posRouter = express.Router();

posRouter.post("/new", createOrder);
posRouter.get(
  "/orders/:tableNO",
  authMiddleware(["Admin", "POSManager"]),
  getOrderByTable
);
posRouter.put(
  "/orders/:tableNO/status",
  authMiddleware(["Admin", "POSManager"]),
  updateTableStatus
);
posRouter.get("/orders", getAllOrders);
posRouter.delete(
  "/orders/:tableNO",
  authMiddleware(["Admin", "POSManager"]),
  deleteOrder
);

export default posRouter;
