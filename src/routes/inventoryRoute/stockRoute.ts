import { Router } from "express";
import stockController from "../../controllers/inventoryController/stockController";
import { authMiddleware } from "../../middlewares/auth";
const stockRoute = Router();

stockRoute.post(
  "/new",
  authMiddleware(["Admin", "InventoryManager"]), // Ensure only Admins and Inventory Managers can access
  stockController
);

export default stockRoute;
