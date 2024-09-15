import { Router } from "express";
import stockController from "../../controllers/inventoryController/stockController";
import { authMiddleware } from "../../middlewares/auth";
const stockRoute = Router();

stockRoute.post(
  "/new",
  authMiddleware(["Admin", "InventoryManager"]),
  stockController
);

export default stockRoute;
