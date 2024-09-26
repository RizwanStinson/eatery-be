import { Response } from 'express';
import { ExtendedRequest } from '../../interfaces/extendedRequest';
import wastageDetails from '../../models/inventoryModel/wastageModel';

export const wastageItems = async (req: ExtendedRequest, res: Response) => {
  try {
    const { user } = req;
    const pageNumber = parseInt((req.query.pageNumber as string) || '0');
    const pageSize = parseInt((req.query.pageSize as string) || '10');
    const totalData = await wastageDetails.countDocuments();
    const expiredItems = await wastageDetails
      .find({ user: user?._id })
      .skip(pageNumber * pageSize)
      .limit(pageSize)
      .limit(pageSize);

    res.status(201).json({ expiredItems, totalData });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
