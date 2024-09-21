import express from "express";
import {
  getNumberOfOrdersForToday,
  getNumberOfOrdersForEachDayInLastSevenDays,
  getTotalRevenueForToday,
  getRevenueForLastSevenDays,
  getTopSellingItems,
} from "../../controllers/dashboardController/dashboardGetController";

const dashboardRouter = express.Router();

dashboardRouter.get("/today", getNumberOfOrdersForToday);
dashboardRouter.get("/sevendays", getNumberOfOrdersForEachDayInLastSevenDays);
dashboardRouter.get("/revenueToday", getTotalRevenueForToday);
dashboardRouter.get("/revenueSevenDays", getRevenueForLastSevenDays);
dashboardRouter.get("/topFive", getTopSellingItems);

export default dashboardRouter;
