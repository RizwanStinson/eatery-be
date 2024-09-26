import { Response } from 'express';
import { ExtendedRequest } from '../../interfaces/extendedRequest';
import inventory from '../../models/inventoryModel/inventoryModel';

export const deleteIngredient = async (req: ExtendedRequest, res: Response) => {
  try {
    const {id} = req.body;
    const ingredient = await inventory.deleteOne({ _id: id });
    res.status(200).json({ ingredient });
  } catch (error) {
    res.status(500);
    res.send(error);
  }
};
