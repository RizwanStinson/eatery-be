import { Request, Response } from "express";
import newIngredient from "../../models/inventoryModel/inventoryModel";
import inventoryDetails from "./inventoryDetails";
import { Iaddingredient } from "../../interfaces/inventoryInterface";

const getIngredientController = async (req: Request, res: Response) => {
  try {
    const ingredient: Iaddingredient[] = await newIngredient.find();
    res.status(200).json(ingredient);
    console.log("ingredientGet", ingredient);
    inventoryDetails(ingredient);
  } catch (error) {
    res.status(500);
    res.send(error);
  }
};

export default getIngredientController;
