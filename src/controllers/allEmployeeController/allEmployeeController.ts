import { Request, Response } from "express";
import User from "../../models/userModel/userModel";
import { ExtendedRequest } from "../../interfaces/extendedRequest";

export const getAllEmployee = async (req: ExtendedRequest, res: Response) => {
  try {
    const organizationName = req.user?.organizationName;

    if (!organizationName) {
      return res
        .status(403)
        .json({ message: "Organization name not found in token" });
    }
    const employees = await User.find({
      organizationName: organizationName,
    }).select("firstName lastName organizationName userType email phone");
    res.status(200).json(employees);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Failed to fetch employee profiles", error });
  }
};
