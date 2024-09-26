import { Response } from "express";
import { ExtendedRequest } from "../../interfaces/extendedRequest";
import newIngredient from "../../models/inventoryModel/newIngredientModel";
import inventory from "../../models/inventoryModel/inventoryModel";

const postIngredientController = async (
  req: ExtendedRequest,
  res: Response
) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const user = req.user;
    const organization = user.organizationName;
    console.log("User Info:", user);

    const Ingredient = {
      ingredient: req.body.ingredient,
      unit: req.body.unit,
      poo: req.body.poo,
      capacity: req.body.capacity,
      // user: user?._id,
      organization,
    };

    console.log("New Ingredient: ", Ingredient);


    const Inventory = await inventory.create(Ingredient);

    res.status(200).json({ createIngredient, Inventory });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send(error);
  }
};

export default postIngredientController;
