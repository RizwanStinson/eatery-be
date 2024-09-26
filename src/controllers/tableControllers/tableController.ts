import { Request, Response } from "express";
import { Table } from "../../models/tableModel/tableModel";
import { Itabledetails } from "../../interfaces/inventoryInterface/interfaces";

const postTable = async (req: Request, res: Response) => {
  try {
    const allTables = [];
    const addTable: Itabledetails = {
      number: req.body.number,
      capacity: req.body.capacity,
      status: req.body.status,
    };
    console.log("new table: ", addTable);
    const newTable = await Table.create(addTable);
    const findTables = await Table.find();
    console.log("all tables: ", findTables);
    return res.status(200).json(findTables);
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export default postTable;
