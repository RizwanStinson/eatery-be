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

posRouter.post("/new-order", authMiddleware(["Admin", "Manager"]), createOrder);
posRouter.get("/orders/:tableNO", authMiddleware(["Admin", "Manager", "Chef"]), getOrderByTable);
posRouter.put("/orders/:tableNO/status", authMiddleware(["Admin", "Manager"]), updateTableStatus);
posRouter.get("/orders", authMiddleware(["Admin", "Manager"]), getAllOrders);
posRouter.delete("/orders/:tableNO", authMiddleware(["Admin", "Manager"]), deleteOrder);

export default posRouter;
