import { Router } from "express";
import addIngredientController from "../../controllers/inventoryController/postInventoryController";

const router = Router();

router.post("/addingredient", addIngredientController);

export default router;
