import { Request, Response } from "express";
import { POS } from "../../models/posModel/posModel";
import { startOfDay, endOfDay } from "date-fns";

export const getNumberOfOrdersForToday = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const start = startOfDay(new Date());
    const end = endOfDay(new Date());

    const totalOrdersToday = await POS.countDocuments({
      createdAt: { $gte: start, $lte: end },
    });

    console.log("Total number of orders for today:", totalOrdersToday);

    return res.status(200).json({
      success: true,
      totalOrdersToday,
    });
  } catch (error) {
    console.error("Error fetching number of orders for today:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
