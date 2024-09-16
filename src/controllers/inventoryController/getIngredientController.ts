import { Response } from "express";
import { ExtendedRequest } from "../../interfaces/extendedRequest"; // Import ExtendedRequest
import newIngredient from "../../models/inventoryModel/newIngredientModel";

const getIngredientController = async (req: ExtendedRequest, res: Response) => {
  try {
    // Check if user exists and get their organization
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const organization = req.user.organization; // Get user's organization
    console.log("User's organization:", organization);

    // Find ingredients for that specific organization
    const ingredients = await newIngredient.find({ organization }); // Filter by organization
    res.status(200).json(ingredients);
    console.log("ingredientGet", ingredients);
  } catch (error) {
    res.status(500).send(error);
  }
};

export default getIngredientController;
