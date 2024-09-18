import express from "express";
import {
  createOrder,
  getOrderByTable,
  updateTableStatus,
  getAllOrders,
  deleteOrder,
} from "../../controllers/posController/posController";

const posRouter = express.Router();


posRouter.post("/new-order", createOrder);
posRouter.get("/orders/:tableNO", getOrderByTable);
posRouter.put("/orders/:tableNO/status", updateTableStatus);
posRouter.get("/orders", getAllOrders);
posRouter.delete("/orders/:tableNO", deleteOrder);

export default posRouter;
