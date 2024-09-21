import { Response } from "express";
import POS from "../../models/posModel/posModel";
import { IPos } from "../../interfaces/posInterface";
import { ExtendedRequest } from "../../interfaces/extendedRequest";

export const createOrder = async (req: ExtendedRequest, res: Response) => {
  try {
    console.log("Request body:", req.body);

    const user = req.user;
    if (!user) {
      return res.status(401).json({ error: "User not authenticated" });
    }

    const orderData: IPos = req.body;
    if (!orderData.tableNo) {
      return res.status(400).json({ error: "Table number is required" });
    }

    const newOrder = new POS({ ...orderData, organization: user.organizationName });
    await newOrder.save();

    res.status(201).json(newOrder);
  } catch (error) {
    console.error("Error creating order:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getOrderByTable = async (req: ExtendedRequest, res: Response) => {
  const { tableNO } = req.params;

  try {
    const user = req.user;
    if (!user) {
      return res.status(401).json({ error: "User not authenticated" });
    }

    const order = await POS.findOne({
      tableNo: Number(tableNO),
      organization: user.organizationName,
    });

    if (!order) {
      return res
        .status(404)
        .json({ message: "Order not found for this table" });
    }

    return res.status(200).json(order);
  } catch (error) {
    console.error("Error retrieving order:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const getAllOrders = async (req: ExtendedRequest, res: Response) => {
  try {
    const orders = await POS.find();

    if (!orders || orders.length === 0) {
      return res.status(404).json({ message: "No orders found" });
    }

    return res.status(200).json(orders);
  } catch (error) {
    console.error("Error retrieving orders:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};
/* const updateIngredients = async (menuItems: any[]) => {
  try {
    for (const menuItem of menuItems) {
      const { ingredients } = menuItem;

      for (const ingredient of ingredients) {
        const { name, properties } = ingredient;

        const inventoryItem = await inventory.findOne({ ingredient: name });

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
}; */
