import { Router } from "express";
import postTable from "../../controllers/tableControllers/tableController";

const tablePOSRoute = Router();

tablePOSRoute.post("/add", postTable);

export default tablePOSRoute;
