import { Router } from "express";
import stockController from "../../controllers/inventoryController/stockController";

const stockRoute = Router();

stockRoute.post("/new", stockController);

export default stockRoute;
