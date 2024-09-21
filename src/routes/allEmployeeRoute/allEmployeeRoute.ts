import express from "express";
import { getAllEmployee } from "../../controllers/allEmployeeController/allEmployeeController";

const routerEmployee = express.Router();

routerEmployee.get("/employee-list", getAllEmployee);

export default routerEmployee;
