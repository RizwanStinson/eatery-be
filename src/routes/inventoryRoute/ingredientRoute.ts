import { Router } from "express";
import postIngredientController from "../../controllers/inventoryController/postIngredientController";
import getIngredientController from "../../controllers/inventoryController/getIngredientController";
import { authMiddleware } from "../../middlewares/auth";

const newIngredientRoute = Router();

newIngredientRoute.post(
  "/addingredient",
  authMiddleware(["Admin", "InventoryManager"]), // Ensure the user is authenticated
  postIngredientController
);

newIngredientRoute.get(
  "/allingredient",
  authMiddleware(["Admin", "InventoryManager"]), // Ensure the user is authenticated
  getIngredientController
);

export default newIngredientRoute;
