import { Request, Response } from 'express';
import inventory from '../../models/inventoryModel/inventoryModel';

const getIngredientController = async (req: Request, res: Response) => {
  try {
    const ingredient = await inventory.find();
    res.status(200).json(ingredient);
  } catch (error) {
    res.status(500);
    res.send(error);
  }
};

export default getIngredientController;
