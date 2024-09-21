import { Request, Response } from "express";
import User from "../../models/userModel/userModel";

export const getAllEmployee = async (req: Request, res: Response) => {
  try {
    const employee = await User.find();
    res.status(200).json(employee);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch HR profiles", error });
  }
};
