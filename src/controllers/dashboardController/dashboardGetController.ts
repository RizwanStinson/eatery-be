import { Request, Response } from "express";
import {POS} from "../../models/posModel/posModel";
import { startOfDay, endOfDay, subDays } from "date-fns";
import { IPos } from "../../interfaces/posInterface";
import { Imenu } from "../../interfaces/posInterface";
import menu from "../../models/menuModel/menuModel";
import OrderIngredients from "../../models/inventoryModel/orderIngredients";

export const getNumberOfOrdersForToday = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const start = startOfDay(new Date());
    console.log("Now Time: ", new Date());
    console.log("Start: ", start);
    const end = endOfDay(new Date());
    console.log("End: ", end);

    const totalOrdersToday = await POS.countDocuments({
      createdAt: { $gte: start, $lte: end },
    });

    console.log("Total number of orders for today:", totalOrdersToday);

    return res.status(200).json(totalOrdersToday);
  } catch (error) {
    console.error("Error fetching number of orders for today:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const getNumberOfOrdersForEachDayInLastSevenDays = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const today = new Date();
    const ordersPerDay = [];

    for (let i = 0; i < 30; i++) {
      const start = startOfDay(subDays(today, i));
      const end = endOfDay(subDays(today, i));

      const ordersCount = await POS.countDocuments({
        createdAt: { $gte: start, $lte: end },
      });

      ordersPerDay.push({
        date: start.toISOString().split("T")[0],
        orders: ordersCount,
      });
    }

    console.log("Orders for each day in the last 7 days:", ordersPerDay);

    return res.status(200).json(ordersPerDay);
  } catch (error) {
    console.error(
      "Error fetching orders for each day in the last 7 days:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const getTotalRevenueForToday = async (req: Request, res: Response) => {
  try {
    const startOfToday = startOfDay(new Date());
    const endOfToday = endOfDay(new Date());

    const orders: IPos[] = await POS.find({
      createdAt: {
        $gte: startOfToday,
        $lte: endOfToday,
      },
    });

    if (!orders || orders.length === 0) {
      return res.status(404).json({ message: "No orders found for today" });
    }

    let totalRevenue = 0;

    orders.forEach((order) => {
      order.menuItems.forEach((item) => {
        let itemTotal = item.sellingPrice * item.quantity;

        item.addOns.forEach((addon) => {
          itemTotal += addon.addonPrice * addon.quantity;
        });

        totalRevenue += itemTotal;
      });
    });

    return res.status(200).json(parseFloat(totalRevenue.toFixed(2)));
  } catch (error) {
    console.error("Error calculating total revenue:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const getRevenueForLastSevenDays = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const today = new Date();
    const revenuePerDay = [];

    for (let i = 0; i < 30; i++) {
      const startOfDayCurrent = startOfDay(subDays(today, i));
      const endOfDayCurrent = endOfDay(subDays(today, i));

      const ordersForDay: IPos[] = await POS.find({
        createdAt: {
          $gte: startOfDayCurrent,
          $lte: endOfDayCurrent,
        },
      });

      let totalRevenueForDay = 0;

      ordersForDay.forEach((order) => {
        order.menuItems.forEach((item) => {
          let itemTotal = item.sellingPrice * item.quantity;

          item.addOns.forEach((addon) => {
            itemTotal += addon.addonPrice * addon.quantity;
          });

          totalRevenueForDay += itemTotal;
        });
      });

      revenuePerDay.push({
        date: startOfDayCurrent.toISOString().split("T")[0],
        revenue: totalRevenueForDay,
      });
    }

    console.log("Revenue for each day in the last 7 days:", revenuePerDay);

    return res.status(200).json(revenuePerDay);
  } catch (error) {
    console.error("Error calculating revenue for the last 7 days:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

export const getTopSellingItems = async (req: Request, res: Response) => {
  try {
    const start = startOfDay(new Date());
    console.log("Now Time: ", new Date());
    console.log("Start: ", start);
    const end = endOfDay(new Date());
    console.log("End: ", end);

    const orders: IPos[] = await POS.find({
      createdAt: { $gte: start, $lt: end },
    });
    const itemCountMap = new Map<string, number>();
    orders.forEach((order) => {
      order.menuItems.forEach((item) => {
        const menuItem = item as unknown as Imenu;
        const currentCount = itemCountMap.get(menuItem.itemName) || 0;
        const updatedCount = currentCount + menuItem.quantity;
        itemCountMap.set(menuItem.itemName, updatedCount);
      });
    });

    const topSellingItems = Array.from(itemCountMap.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([itemName, count]) => ({ itemName, count }));

    return res.json(topSellingItems);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};


export const getAllItems = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
   
   const totalItems = await menu.countDocuments();

    console.log("Total number of orders for today:", totalItems);

    return res.status(200).json(totalItems);
  } catch (error) {
    console.error("Error fetching number of orders for today:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const getTotalExpenseForToday = async (req: Request, res: Response) => {
  try {
    const startOfToday = startOfDay(new Date());
    const endOfToday = endOfDay(new Date());

  
    const orders = await OrderIngredients.find(
      {
        createdAt: {
          $gte: startOfToday,
          $lte: endOfToday,
        },
      }
    );

    if (!orders || orders.length === 0) {
      return res.status(404).json({ message: "No orders found for today" });
    }


    let totalExpense = 0;
    orders.forEach((order) => {
      totalExpense += order.cost;
    });

    return res.status(200).json(parseFloat(totalExpense.toFixed(2)));
  } catch (error) {
    console.error("Error calculating total expense:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};