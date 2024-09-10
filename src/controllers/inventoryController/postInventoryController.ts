import { Request, Response } from "express";
import newIngredient from "../../models/inventoryModel/inventoryModel";

const addIngredientController = async (req: Request, res: Response) => {
  try {
    const newObj = {
      name: req.body.name,
      unit: req.body.unit,
      orderPoint: req.body.orderPoint,
      capacity: req.body.capacity,
    };
    console.log("newObj", newObj);
    const ingredient = await newIngredient.create(newObj);
    res.status(200).json(ingredient);
  } catch (error) {
    res.status(500);
    res.send(error);
  }
};

export default addIngredientController;
