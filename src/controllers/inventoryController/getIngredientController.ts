import { Request, Response } from "express";
import newIngredient from "../../models/inventoryModel/newIngredientModel";

const getIngredientController = async (req: Request, res: Response) => {
  try {
    const ingredient = await newIngredient.find();
    res.status(200).json(ingredient);
    console.log("ingredientGet", ingredient);
  } catch (error) {
    res.status(500);
    res.send(error);
  }
};

export default getIngredientController;
