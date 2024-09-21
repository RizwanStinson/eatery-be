import { Response } from "express";
import { ExtendedRequest } from "../../interfaces/extendedRequest"; // Import ExtendedRequest
import newIngredient from "../../models/inventoryModel/newIngredientModel";

const getIngredientController = async (req: ExtendedRequest, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const organization = req.user.organizationName; 
    console.log("User's organization:", organization);

    const ingredients = await newIngredient.find({ organization }); 
    res.status(200).json(ingredients);
    console.log("ingredientGet", ingredients);
  } catch (error) {
    res.status(500).send(error);
  }
};

export default getIngredientController;
