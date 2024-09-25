// import { Router } from "express";
// import menuController from "../../controllers/menuController/postMenuController";
// import getMenuController from "../../controllers/menuController/getMenuController";
// import deleteMenuController from "../../controllers/menuController/deleteMenuController";
// import { authMiddleware } from "../../middlewares/auth";


// const routerMenu = Router();

// routerMenu.post(
//   "/addmenu",
//   /* authMiddleware(["Admin", "MenuManager"]), */
//   menuController
// );
// routerMenu.get(
//   "/allmenu",
//   /* authMiddleware(["Admin", "MenuManager"]), */
//   getMenuController
// );

// routerMenu.delete(
//   '/items/:id',
//   /* authMiddleware(["Admin", "MenuManager"]), */
//   deleteMenuController
// );


// export default routerMenu;

import { Router } from "express";
import deleteMenuController from "../../controllers/menuController/deleteMenuController";
import getMenuController from "../../controllers/menuController/getMenuController";
import menuController from "../../controllers/menuController/postMenuController";

const routerMenu = Router();

routerMenu.post("/addmenu", menuController);

routerMenu.get("/allmenu", getMenuController);
routerMenu.delete('/items/:id', deleteMenuController);



export default routerMenu;
