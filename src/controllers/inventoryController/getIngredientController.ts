import { Response } from 'express';
import { ExtendedRequest } from '../../interfaces/extendedRequest';
import inventory from '../../models/inventoryModel/inventoryModel';

const getIngredientController = async (req: ExtendedRequest, res: Response) => {
  try {
    const pageNumber = parseInt((req.query.pageNumber as string) || '0');
    const pageSize = parseInt((req.query.pageSize as string) || '10');
    const totalData = await inventory.countDocuments();
    const { user } = req;
    const ingredient = await inventory
      .find({ user: user?._id })
      .skip(pageNumber * pageSize)
      .limit(pageSize);
    res.status(200).json({ ingredient, totalData });
  } catch (error) {
    res.status(500);
    res.send(error);
  }
};
export default getIngredientController;
