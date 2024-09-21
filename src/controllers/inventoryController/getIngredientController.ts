import { Request, Response } from 'express';
import inventory from '../../models/inventoryModel/inventoryModel';
import { ExtendedRequest } from '../../interfaces/extendedRequest';

const getIngredientController = async (req: ExtendedRequest, res: Response) => {
  try {
    const { user } = req;
    const ingredient = await inventory.find({ user: user?._id });
    res.status(200).json(ingredient);
  } catch (error) {
    res.status(500);
    res.send(error);
  }
};

export default getIngredientController;
