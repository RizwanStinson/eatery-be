import express from "express";
import { getNumberOfOrdersForToday } from "../../controllers/dashboardController/dashboardGetController";

const dashboardRouter = express.Router();

dashboardRouter.get("/", getNumberOfOrdersForToday);

export default dashboardRouter;
