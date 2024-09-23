import { Router } from "express";
import postIngredientController from "../../controllers/inventoryController/postIngredientController";
import getIngredientController from "../../controllers/inventoryController/getIngredientController";
import { authMiddleware } from "../../middlewares/auth";
import { orderIngredient } from "../../controllers/inventoryController/orderController";

const newIngredientRoute = Router();

newIngredientRoute.post(
  "/addingredient",
  authMiddleware(["Admin", "InventoryManager"]),
  postIngredientController
);

newIngredientRoute.get(
  "/allingredient",
  authMiddleware(["Admin", "InventoryManager"]),
  getIngredientController
);

newIngredientRoute.post(
  "/order-ingredient",
  authMiddleware(["Admin", "InventoryManager"]),
  orderIngredient
);

export default newIngredientRoute;
