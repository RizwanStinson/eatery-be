import { Request, Response } from "express";
import { POS } from "../../models/posModel/posModel";
import inventory from "../../models/inventoryModel/inventoryModel";
import { ExtendedRequest } from "../../interfaces/extendedRequest";
import { Imenu, IPos } from "../../interfaces/posInterface";

export const createOrder = async (req: ExtendedRequest, res: Response) => {
  try {
    const { orderDetails } = req.body;
    const { organizationName } = req.user!;

    const newOrder = new POS({
      tableNo: orderDetails.tableNo,
      tableStatus: orderDetails.tableStatus,
      menuItems: orderDetails.menuItems,
      preparationTime: orderDetails.preparationTime,
      totalPrice: orderDetails.totalPrice,
      organizationName,
    });

    await newOrder.save();

    updateIngredients(newOrder.menuItems, organizationName);
    // updateIngredients(newOrder.menuItems);

    return res.status(201).json(newOrder);
  } catch (error) {
    console.error("Error creating order:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const getAllOrders = async (req: ExtendedRequest, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "User not authenticated" });
    }

    const { organizationName } = req.user;

    const orders = await POS.find({ organizationName: organizationName });

    if (!orders || orders.length === 0) {
      return res
        .status(404)
        .json({ message: "No orders found for your organization" });
    }

    return res.status(200).json(orders);
  } catch (error) {
    console.error("Error retrieving orders:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const getTopSellingItems = async (
  req: ExtendedRequest,
  res: Response
) => {
  try {
    const organizationName = req.user?.organizationName;
    const orders: IPos[] = await POS.find({ organizationName });
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
      .map(([itemName, count]) => ({ itemName, count }));

    return res.json(topSellingItems);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

const updateIngredients = async (
  menuItems: any[],
  organizationName: string
) => {
  try {
    for (const menuItem of menuItems) {
      const { ingredients } = menuItem;

      for (const ingredient of ingredients) {
        const { name, properties } = ingredient;

        const inventoryItem = await inventory.findOne({
          ingredient: name,
          organizationName,
        });

        if (inventoryItem) {
          const newPrevStock =
            (inventoryItem.prevStock as number) - properties.quantity;
          const newCurrentStock =
            (inventoryItem.currentStock as number) - properties.quantity;

          inventoryItem.prevStock = newPrevStock >= 0 ? newPrevStock : 0;
          inventoryItem.currentStock =
            newCurrentStock >= 0 ? newCurrentStock : 0;
          await inventoryItem.save();
        } else {
          console.warn(`Ingredient ${name} not found in inventory.`);
        }
      }
    }
  } catch (error) {
    console.error("Error updating ingredients in inventory:", error);
  }
};
