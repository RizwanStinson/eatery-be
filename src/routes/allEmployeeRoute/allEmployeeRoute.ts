import express from "express";
import { getAllEmployee } from "../../controllers/allEmployeeController/allEmployeeController";

const router = express.Router();

router.get("/hr", getAllEmployee);

export default router;
