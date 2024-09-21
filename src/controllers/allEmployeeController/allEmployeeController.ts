import { Request, Response } from 'express';
import allEmployee from '../../models/allEmployeeModel/allEmployeeModel';

export const getAllEmployee = async (req: Request, res: Response) => {
  try {
    const hrs = await allEmployee.find();
    res.status(200).json(hrs);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch HR profiles", error });
  }
};

