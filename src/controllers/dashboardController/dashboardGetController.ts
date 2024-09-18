import { Request, Response } from "express";
import { POS } from "../../models/dashboardModel/todayOrder";
import { startOfDay, endOfDay, subDays } from "date-fns";
import { IPos } from "../../interfaces/posInterface";
import { Imenu } from "../../interfaces/posInterface";

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

export const getNumberOfOrdersForEachDayInLastSevenDays = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const today = new Date();
    const ordersPerDay = [];

    for (let i = 0; i < 7; i++) {
      const start = startOfDay(subDays(today, i));
      const end = endOfDay(subDays(today, i));

      const ordersCount = await POS.countDocuments({
        createdAt: { $gte: start, $lte: end },
      });

      ordersPerDay.push({
        date: start.toISOString().split("T")[0], // format date as YYYY-MM-DD
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

export const getAllOrdersToday = async (req: Request, res: Response) => {
  try {
    const startOfToday = startOfDay(new Date()); // Start of the current day
    const endOfToday = endOfDay(new Date()); // End of the current day

    // Query to find orders created between the start and end of today
    const orders = await POS.find({
      createdAt: {
        $gte: startOfToday,
        $lte: endOfToday,
      },
    });

    if (!orders || orders.length === 0) {
      return res.status(404).json({ message: "No orders found for today" });
    }

    return res.status(200).json(orders);
  } catch (error) {
    console.error("Error retrieving today's orders:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const getTotalRevenueForToday = async (req: Request, res: Response) => {
  try {
    const startOfToday = startOfDay(new Date()); // Start of the current day
    const endOfToday = endOfDay(new Date()); // End of the current day

    // Find orders created between the start and end of today
    const orders = await POS.find({
      createdAt: {
        $gte: startOfToday,
        $lte: endOfToday,
      },
    });

    if (!orders || orders.length === 0) {
      return res.status(404).json({ message: "No orders found for today" });
    }

    // Calculate total revenue for today
    let totalRevenue = 0;

    orders.forEach((order) => {
      order.menuItems.forEach((item) => {
        // Calculate selling price * quantity for the item
        let itemTotal = item.sellingPrice * item.quantity;

        // Add the price for each add-on
        item.addOns.forEach((addon) => {
          itemTotal += addon.addonPrice * addon.quantity;
        });

        // Add item total to the total revenue
        totalRevenue += itemTotal;
      });
    });

    return res.status(200).json({ totalRevenue: totalRevenue.toFixed(2) });
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

    // Loop through the past 7 days
    for (let i = 0; i < 7; i++) {
      const startOfDayCurrent = startOfDay(subDays(today, i));
      const endOfDayCurrent = endOfDay(subDays(today, i));

      // Find all orders for the current day
      const ordersForDay = await POS.find({
        createdAt: {
          $gte: startOfDayCurrent,
          $lte: endOfDayCurrent,
        },
      });

      // Calculate total revenue for the current day
      let totalRevenueForDay = 0;

      ordersForDay.forEach((order) => {
        order.menuItems.forEach((item) => {
          let itemTotal = item.sellingPrice * item.quantity;

          // Add the price for each add-on
          item.addOns.forEach((addon) => {
            itemTotal += addon.addonPrice * addon.quantity;
          });

          totalRevenueForDay += itemTotal;
        });
      });

      // Push the result for the current day in the format { date: YYYY-MM-DD, revenue: total }
      revenuePerDay.push({
        date: startOfDayCurrent.toISOString().split("T")[0], // format as YYYY-MM-DD
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

// export const getRevenueForLastSevenDays = async (
//   req: Request,
//   res: Response
// ) => {
//   try {
//     // Get the start of 7 days ago
//     const startOfSevenDaysAgo = startOfDay(subDays(new Date(), 6));
//     const endOfToday = endOfDay(new Date());

//     // Find orders created between the start of 7 days ago and end of today
//     const orders = await POS.find({
//       createdAt: {
//         $gte: startOfSevenDaysAgo,
//         $lte: endOfToday,
//       },
//     });

//     if (!orders || orders.length === 0) {
//       return res
//         .status(404)
//         .json({ message: "No orders found in the last 7 days" });
//     }

//     // Initialize an object to store revenue per day
//     let revenueByDate: Record<string, number> = {};

//     // Loop through the past 7 days
//     for (let i = 0; i < 7; i++) {
//       const currentDay = subDays(new Date(), i);
//       const startOfCurrentDay = startOfDay(currentDay);
//       const endOfCurrentDay = endOfDay(currentDay);

//       // Filter orders for the current day
//       const ordersForDay = orders.filter(
//         (order) =>
//           order.createdAt >= startOfCurrentDay &&
//           order.createdAt <= endOfCurrentDay
//       );

//       // Calculate total revenue for the current day
//       let totalRevenueForDay = 0;

//       ordersForDay.forEach((order) => {
//         order.menuItems.forEach((item) => {
//           let itemTotal = item.sellingPrice * item.quantity;

//           // Add the price for each add-on
//           item.addOns.forEach((addon) => {
//             itemTotal += addon.addonPrice * addon.quantity;
//           });

//           totalRevenueForDay += itemTotal;
//         });
//       });

//       // Store the revenue in the format "YYYY-MM-DD"
//       revenueByDate[startOfCurrentDay.toISOString().split("T")[0]] =
//         totalRevenueForDay;
//     }

//     return res.status(200).json(revenueByDate);
//   } catch (error) {
//     console.error("Error calculating revenue for the last 7 days:", error);
//     return res.status(500).json({ error: "Internal server error" });
//   }
// };

// export const getTop5SellingItemsForToday = async (
//   req: Request,
//   res: Response
// ) => {
//   try {
//     const startOfToday = startOfDay(new Date()); // Start of the current day
//     const endOfToday = endOfDay(new Date()); // End of the current day

//     // Find orders created between the start and end of today
//     const orders = await POS.find({
//       createdAt: {
//         $gte: startOfToday,
//         $lte: endOfToday,
//       },
//     });

//     if (!orders || orders.length === 0) {
//       return res.status(404).json({ message: "No orders found for today" });
//     }

//     // Use a Map to track the total quantities of each item
//     const itemCountMap = new Map<string, number>();

//     orders.forEach((order) => {
//       order.menuItems.forEach((item) => {
//         const currentCount = itemCountMap.get(item.itemName) || 0;
//         const updatedCount = currentCount + item.quantity;
//         itemCountMap.set(item.itemName, updatedCount);
//       });
//     });

//     // Convert the map to an array and sort it by quantity in descending order
//     const sortedItems = Array.from(itemCountMap.entries()).sort(
//       (a, b) => b[1] - a[1]
//     );

//     // Map sorted items into the required format: "itemName - quantity"
//     const topItems = sortedItems.map(([itemName, quantity]) => ({
//       itemName,
//       quantity,
//     }));

//     return res.status(200).json(topItems);
//   } catch (error) {
//     console.error("Error fetching top selling items:", error);
//     return res.status(500).json({ error: "Internal server error" });
//   }
// };

export const getTopSellingItems = async (req: Request, res: Response) => {
  try {
    // Use date-fns to get start and end of today
    const start = startOfDay(new Date());
    console.log("Now Time: ", new Date());
    console.log("Start: ", start);
    const end = endOfDay(new Date());
    console.log("End: ", end);

    // Fetch all orders created within today
    const orders: IPos[] = await POS.find({
      createdAt: { $gte: start, $lt: end },
    });

    // Map to store itemName and quantity
    const itemCountMap = new Map<string, number>();

    // Iterate over all orders
    orders.forEach((order) => {
      // For each order, iterate over the menu items
      order.menuItems.forEach((item) => {
        // Type assertion to ensure 'item' is treated as Imenu
        const menuItem = item as unknown as Imenu;

        // Access 'itemName' and update the count in the map
        const currentCount = itemCountMap.get(menuItem.itemName) || 0;
        const updatedCount = currentCount + menuItem.quantity;

        // Update the map
        itemCountMap.set(menuItem.itemName, updatedCount);
      });
    });

    // Sort items by quantity and get top 5
    const topSellingItems = Array.from(itemCountMap.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([itemName, count]) => ({ itemName, count }));

    // Send the result as a response
    return res.json(topSellingItems);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
