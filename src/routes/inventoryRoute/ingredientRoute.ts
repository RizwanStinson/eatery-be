import { Router } from "express";
import postIngredientController from "../../controllers/inventoryController/postIngredientController";
import getIngredientController from "../../controllers/inventoryController/getIngredientController";
import { authMiddleware } from "../../middlewares/auth";

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
import { orderIngredient } from '../../controllers/inventoryController/orderController';


newIngredientRoute.post("/addingredient", postIngredientController);
newIngredientRoute.get("/allingredient", getIngredientController);
newIngredientRoute.post('/order-ingredient',orderIngredient)

export default newIngredientRoute;
