import { Router } from "express";
import addIngredientController from "../../controllers/inventoryController/postInventoryController";
import getIngredientController from "../../controllers/inventoryController/getInventoryController";

const router = Router();

router.post("/addingredient", addIngredientController);
router.get("/getingredient", getIngredientController);

export default router;
