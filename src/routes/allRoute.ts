import { Router } from "express";
import userRouter from "./userRoute/userRoute";
import getProfileRouter from "./userRoute/getProfile";
import posRouter from "./posRoute/posroute";
import newIngredientRoute from "./inventoryRoute/ingredientRoute";
import stockRoute from "./inventoryRoute/stockRoute";
import routerMenu from "./menuRoute/menuRoute";
import dashboardRouter from "./dashboardRoute/dashboardRoute";
import tablePOSRoute from "./tablePOSRoute/tablePosRoute";
import routerEmployee from "./allEmployeeRoute/allEmployeeRoute";

const router = Router();
router.use("/", userRouter);
// router.use("/", getProfileRouter);
router.use("/pos", posRouter);

//dashboardRoutes
router.use("/dashboardget", dashboardRouter);

//inventory
router.use("/ingredient", newIngredientRoute);
router.use("/stock", stockRoute);

//menu
router.use("/menu", routerMenu);

//tablePOS
router.use("/tablePOS", tablePOSRoute);

router.use("/ingredient", newIngredientRoute);
router.use("/stock", stockRoute);
router.use("/menu", routerMenu);

//hr
router.use("/hr", routerEmployee);

export default router;
