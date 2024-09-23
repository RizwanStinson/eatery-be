import { Response } from "express";
import Menu from "../../models/menuModel/menuModel";
import { ExtendedRequest } from "../../interfaces/extendedRequest";

const getMenuController = async (req: ExtendedRequest, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "User not authenticated" });
    }

    const organizationName = req.user.organizationName;
    const allMenu = await Menu.find({ organizationName: organizationName });
    res.status(200).json(allMenu);
  } catch (error) {
    console.error("Error fetching menu items:", error);
    res.status(500).send(error);
  }
};

export default getMenuController;
