import { Response } from "express";
import { ExtendedRequest } from "../../interfaces/extendedRequest";
import inventory from "../../models/inventoryModel/inventoryModel";

const getIngredientController = async (req: ExtendedRequest, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const organizationName = req.user.organizationName;
    console.log("User's organization:", organizationName);
    const pageNumber = parseInt((req.query.pageNumber as string) || "0");
    const pageSize = parseInt((req.query.pageSize as string) || "10");
    const totalData = await inventory.countDocuments();
    const { user } = req;
    const ingredient = await inventory
      .find({ organizationName: organizationName })
      .skip(pageNumber * pageSize)
      .limit(pageSize);
    res.status(200).json({ ingredient, totalData });
  } catch (error) {
    res.status(500).send(error);
  }
};
export default getIngredientController;
