import express from "express";
import { getAllEmployee } from "../../controllers/allEmployeeController/allEmployeeController";
import { authMiddleware } from "../../middlewares/auth";

const routerEmployee = express.Router();

routerEmployee.get(
  "/employee-list",
  authMiddleware(["Admin", "HRManager"]),
  getAllEmployee
);

export default routerEmployee;
