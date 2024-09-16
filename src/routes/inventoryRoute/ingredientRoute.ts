import { Router } from "express";
import postIngredientController from "../../controllers/inventoryController/postIngredientController";
import getIngredientController from "../../controllers/inventoryController/getIngredientController";
import { orderIngredient } from '../../controllers/inventoryController/orderController';

const newIngredientRoute = Router();

newIngredientRoute.post("/addingredient", postIngredientController);
newIngredientRoute.get("/allingredient", getIngredientController);
newIngredientRoute.post('/order-ingredient',orderIngredient)

export default newIngredientRoute;
