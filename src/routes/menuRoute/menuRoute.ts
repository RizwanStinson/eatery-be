import { Router } from "express";
import menuController from "../../controllers/menuController/postMenuController";
import getMenuController from "../../controllers/menuController/getMenuController";
import deleteMenuController from "../../controllers/menuController/deleteMenuController";
import { authMiddleware } from "../../middlewares/auth";


const routerMenu = Router();

routerMenu.post(
  "/addmenu",
  /* authMiddleware(["Admin", "MenuManager"]), */
  menuController
);
routerMenu.get(
  "/allmenu",
  /* authMiddleware(["Admin", "MenuManager"]), */
  getMenuController
);

routerMenu.delete(
  '/items/:id',
  /* authMiddleware(["Admin", "MenuManager"]), */
  deleteMenuController
);


export default routerMenu;
