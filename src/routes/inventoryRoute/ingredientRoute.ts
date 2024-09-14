import { Router } from "express";
import postIngredientController from "../../controllers/inventoryController/postIngredientController";
import getIngredientController from "../../controllers/inventoryController/getIngredientController";

const newIngredientRoute = Router();

newIngredientRoute.post("/addingredient", postIngredientController);
newIngredientRoute.get("/allingredient", getIngredientController);

export default newIngredientRoute;
