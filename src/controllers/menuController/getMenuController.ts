import { Request, Response } from "express";
import menu from "../../models/menuModel/menuModel";

const getMenuController = async (req: Request, res: Response) => {
  try {
    const allMenu = await menu.find();
    res.status(200).json(allMenu);
  } catch (error) {
    res.status(500);
    res.send(error);
  }
};
export default getMenuController;
