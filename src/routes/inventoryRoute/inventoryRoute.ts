import { Router } from "express";
import addIngredientController from "../../controllers/inventoryController/postInventoryController";
import getIngredientController from "../../controllers/inventoryController/getInventoryController";

const routerInventory = Router();

routerInventory.post("/addingredient", addIngredientController);
routerInventory.get("/getingredient", getIngredientController);

export default routerInventory;
