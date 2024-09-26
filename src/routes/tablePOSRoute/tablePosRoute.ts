import { Router } from "express";
import postTable from "../../controllers/tableControllers/tableController";
import getTable from "../../controllers/tableControllers/getTableController";
import deleteTable from "../../controllers/tableControllers/deletTableController";
import updateTable from "../../controllers/tableControllers/updateTableController";

const tablePOSRoute = Router();

tablePOSRoute.post("/add", postTable);
tablePOSRoute.get("/get", getTable);
tablePOSRoute.delete("/delete/:tableNumber", deleteTable);
tablePOSRoute.put("/updateTable", updateTable);

export default tablePOSRoute;
