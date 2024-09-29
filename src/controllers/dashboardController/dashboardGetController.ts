import { Request, Response } from "express";
import { POS } from "../../models/posModel/posModel";
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

//actual code

// export const getNumberOfOrdersForEachDayInLastSevenDays = async (
//   req: Request,
//   res: Response
// ): Promise<Response> => {
//   try {
//     const today = new Date();
//     const ordersPerDay = [];

//     for (let i = 0; i < 30; i++) {
//       const start = startOfDay(subDays(today, i));
//       const end = endOfDay(subDays(today, i));

//       const ordersCount = await POS.countDocuments({
//         createdAt: { $gte: start, $lte: end },
//       });

//       ordersPerDay.push({
//         date: start.toISOString().split("T")[0],
//         orders: ordersCount,
//       });
//     }

//     console.log("Orders for each day in the last 7 days:", ordersPerDay);

//     return res.status(200).json(ordersPerDay);
//   } catch (error) {
//     console.error(
//       "Error fetching orders for each day in the last 7 days:",
//       error
//     );

//     return res.status(500).json({
//       success: false,
//       message: "Internal server error",
//     });
//   }
// };

//fake code

interface OrderData {
  date: string;
  orders: number;
}

export const getNumberOfOrdersForEachDayInLastSevenDays = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const today = new Date();
    const ordersPerDay: OrderData[] = [
      { date: "2024-09-30", orders: 18 },
      { date: "2024-09-29", orders: 10 },
      { date: "2024-09-28", orders: 27 },
      { date: "2024-09-27", orders: 4 },
      { date: "2024-09-26", orders: 7 },
      { date: "2024-09-25", orders: 12 },
      { date: "2024-09-24", orders: 24 },
      { date: "2024-09-23", orders: 9 },
      { date: "2024-09-22", orders: 30 },
      { date: "2024-09-21", orders: 14 },
      { date: "2024-09-20", orders: 22 },
      { date: "2024-09-19", orders: 11 },
      { date: "2024-09-18", orders: 0 },
      { date: "2024-09-17", orders: 6 },
      { date: "2024-09-16", orders: 3 },
      { date: "2024-09-15", orders: 25 },
      { date: "2024-09-14", orders: 1 },
      { date: "2024-09-13", orders: 8 },
      { date: "2024-09-12", orders: 19 },
      { date: "2024-09-11", orders: 13 },
      { date: "2024-09-10", orders: 5 },
      { date: "2024-09-09", orders: 17 },
      { date: "2024-09-08", orders: 2 },
      { date: "2024-09-07", orders: 15 },
      { date: "2024-09-06", orders: 29 },
      { date: "2024-09-05", orders: 9 },
      { date: "2024-09-04", orders: 23 },
      { date: "2024-09-03", orders: 12 },
      { date: "2024-09-02", orders: 4 },
      { date: "2024-09-01", orders: 27 },
      { date: "2024-08-31", orders: 21 },
      { date: "2024-08-30", orders: 30 },
    ];

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

// actual code

// export const getRevenueForLastSevenDays = async (
//   req: Request,
//   res: Response
// ): Promise<Response> => {
//   try {
//     const today = new Date();
//     const revenuePerDay = [];

//     for (let i = 0; i < 30; i++) {
//       const startOfDayCurrent = startOfDay(subDays(today, i));
//       const endOfDayCurrent = endOfDay(subDays(today, i));

//       const ordersForDay: IPos[] = await POS.find({
//         createdAt: {
//           $gte: startOfDayCurrent,
//           $lte: endOfDayCurrent,
//         },
//       });

//       let totalRevenueForDay = 0;

//       ordersForDay.forEach((order) => {
//         order.menuItems.forEach((item) => {
//           let itemTotal = item.sellingPrice * item.quantity;

//           item.addOns.forEach((addon) => {
//             itemTotal += addon.addonPrice * addon.quantity;
//           });

//           totalRevenueForDay += itemTotal;
//         });
//       });

//       revenuePerDay.push({
//         date: startOfDayCurrent.toISOString().split("T")[0],
//         revenue: totalRevenueForDay,
//       });
//     }

//     console.log("Revenue for each day in the last 7 days:", revenuePerDay);

//     return res.status(200).json(revenuePerDay);
//   } catch (error) {
//     console.error("Error calculating revenue for the last 7 days:", error);
//     return res
//       .status(500)
//       .json({ success: false, message: "Internal server error" });
//   }
// };

// fake code

interface RevenueData {
  date: string;
  revenue: number;
}

export const getRevenueForLastSevenDays = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const today = new Date();
    const revenuePerDay: RevenueData[] = [
      {
        date: "2024-09-30",
        revenue: 104,
      },
      {
        date: "2024-09-29",
        revenue: 85,
      },
      {
        date: "2024-09-28",
        revenue: 178,
      },
      {
        date: "2024-09-27",
        revenue: 25,
      },
      {
        date: "2024-09-26",
        revenue: 60,
      },
      {
        date: "2024-09-25",
        revenue: 129,
      },
      {
        date: "2024-09-24",
        revenue: 98,
      },
      {
        date: "2024-09-23",
        revenue: 135,
      },
      {
        date: "2024-09-22",
        revenue: 70,
      },
      {
        date: "2024-09-21",
        revenue: 41,
      },
      {
        date: "2024-09-20",
        revenue: 150,
      },
      {
        date: "2024-09-19",
        revenue: 200,
      },
      {
        date: "2024-09-18",
        revenue: 90,
      },
      {
        date: "2024-09-17",
        revenue: 42,
      },
      {
        date: "2024-09-16",
        revenue: 176,
      },
      {
        date: "2024-09-15",
        revenue: 12,
      },
      {
        date: "2024-09-14",
        revenue: 190,
      },
      {
        date: "2024-09-13",
        revenue: 99,
      },
      {
        date: "2024-09-12",
        revenue: 64,
      },
      {
        date: "2024-09-11",
        revenue: 152,
      },
      {
        date: "2024-09-10",
        revenue: 47,
      },
      {
        date: "2024-09-09",
        revenue: 80,
      },
      {
        date: "2024-09-08",
        revenue: 121,
      },
      {
        date: "2024-09-07",
        revenue: 59,
      },
      {
        date: "2024-09-06",
        revenue: 192,
      },
      {
        date: "2024-09-05",
        revenue: 33,
      },
      {
        date: "2024-09-04",
        revenue: 73,
      },
      {
        date: "2024-09-03",
        revenue: 44,
      },
      {
        date: "2024-09-02",
        revenue: 199,
      },
      {
        date: "2024-09-01",
        revenue: 32,
      },
      {
        date: "2024-08-31",
        revenue: 108,
      },
      {
        date: "2024-08-30",
        revenue: 51,
      },
    ];
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

    const orders = await OrderIngredients.find({
      createdAt: {
        $gte: startOfToday,
        $lte: endOfToday,
      },
    });

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
