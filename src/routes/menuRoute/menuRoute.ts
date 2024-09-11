import { Router } from "express";
import menuController from "../../controllers/menuController/postMenuController";

const routerMenu = Router();

routerMenu.post("/addmenu", menuController);

export default routerMenu;
