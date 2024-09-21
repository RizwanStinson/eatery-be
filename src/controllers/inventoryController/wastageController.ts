import { Response } from 'express';
import { ExtendedRequest } from '../../interfaces/extendedRequest';
import wastageDetails from '../../models/inventoryModel/wastageModel';

  export const wastageItems = async (req: ExtendedRequest, res: Response) => {
  try {
    const expiredItems = await wastageDetails.find();
    res.status(201).json(expiredItems);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
