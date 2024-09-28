import { Request, Response } from "express";
import { Table } from "../../models/tableModel/tableModel";

const updateTable = async (req: Request, res: Response) => {
  try {
    const { tableNumber, status } = req.body;

    const updatedTable = await Table.findOneAndUpdate(
      { number: tableNumber },
      { status: status },
      { new: true }
    );

    if (!updatedTable) {
      return res.status(404).json({
        success: false,
        message: "Table not found",
      });
    }
    const findTables = await Table.find();

    return res.status(200).json({
      success: true,
      message: "Table status updated successfully",
      findTables,
    });
  } catch (error) {
    console.error("Error updating table status:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export default updateTable;
