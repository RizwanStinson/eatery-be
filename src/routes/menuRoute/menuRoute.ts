import { Router } from "express";
import menuController from "../../controllers/menuController/postMenuController";
import getMenuController from "../../controllers/menuController/getMenuController";

const routerMenu = Router();

routerMenu.post("/addmenu", menuController);
routerMenu.get("/allmenu", getMenuController);

export default routerMenu;
