import { Response } from "express";
import Menu from "../../models/menuModel/menuModel";
import { ExtendedRequest } from "../../interfaces/extendedRequest";

const getMenuController = async (req: ExtendedRequest, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "User not authenticated" });
    }
    
    const organization = req.user.organization;
    const allMenu = await Menu.find({ organization: organization });
    res.status(200).json(allMenu);
  } catch (error) {
    console.error("Error fetching menu items:", error);
    res.status(500).send(error);
  }
};

export default getMenuController;
