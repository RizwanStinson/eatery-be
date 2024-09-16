import { Response } from "express";
import { ExtendedRequest } from "../../interfaces/extendedRequest"; // Import your ExtendedRequest
import newIngredient from "../../models/inventoryModel/newIngredientModel";
import inventory from "../../models/inventoryModel/inventoryModel";

const postIngredientController = async (
  req: ExtendedRequest,
  res: Response
) => {
  try {
    // Check if user is authenticated
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const user = req.user;
    const organization = user.organization; // Get the user's organization
    console.log("User Info:", user);

    // Ingredient object with organization
    const Ingredient = {
      name: req.body.name,
      unit: req.body.unit,
      orderPoint: req.body.orderPoint,
      capacity: req.body.capacity,
      organization, // Link ingredient to the user's organization
    };

    console.log("New Ingredient: ", Ingredient);

    // Save new ingredient and inventory
    const createIngredient = await newIngredient.create(Ingredient);
    const Inventory = await inventory.create(Ingredient);

    res.status(200).json({ createIngredient, Inventory });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send(error);
  }
};

export default postIngredientController;
