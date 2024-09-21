import { Request, Response } from "express";
import { Table } from "../../models/tableModel/tableModel";

const deleteTable = async (req: Request, res: Response) => {
  try {
    const { tableNumber } = req.params;
    const tableNumberInt = parseInt(tableNumber);
    const deletedTable = await Table.findOneAndDelete({
      number: tableNumberInt,
    });

    if (!deletedTable) {
      return res.status(404).json({
        success: false,
        message: "Table not found",
      });
    }
    const remainingTables = await Table.find();

    return res.status(200).json({
      success: true,
      message: "Table deleted successfully",
      deletedTable,
      remainingTables,
    });
  } catch (error) {
    console.error("Error deleting table:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export default deleteTable;
