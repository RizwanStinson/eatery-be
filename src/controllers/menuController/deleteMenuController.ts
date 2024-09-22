import menu from "../../models/menuModel/menuModel";
import { Request, Response } from "express";

const deleteMenuController = async (req: Request, res: Response) => {
  try {
    const itemId = req.params.id;
    const result = await menu.findByIdAndDelete(itemId);

    if (!result) {
      res.status(404).json({ message: "Item not found" });
      return;
    }
    res.status(200).json({ message: "Item successfully deleted" });
    
  } catch (error) {
    res.status(500).json({ message: "Error deleting item", error });
  }
};

export default deleteMenuController;    