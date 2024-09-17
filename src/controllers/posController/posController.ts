import { Request, Response } from "express";
import { POS } from "../../models/posModel/posModel";
import inventory from "../../models/inventoryModel/inventoryModel";

export const createOrder = async (req: Request, res: Response) => {
  try {
    const { orderDetails } =
      req.body;

    const newOrder = new POS({
      tableNo : orderDetails.tableNo,
      tableStatus : orderDetails.tableStatus ,
      menuItems : orderDetails.menuItems,
      preparationTime: orderDetails.preparationTime,
      totalPrice : orderDetails.totalPrice
    });

    await newOrder.save();

    updateIngredients(newOrder.menuItems);

    return res.status(201).json({
      message: "Order created successfully",
      order: newOrder,
    });
  } catch (error) {
    console.error("Error creating order:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const getOrderByTable = async (req: Request, res: Response) => {
  const tableNO = Number(req.params.tableNO);

  try {
    const order = await POS.findOne({ tableNO });

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

export const updateTableStatus = async (req: Request, res: Response) => {
  const tableNO = req.params.tableNO;
  const { tableStatus } = req.body;

  try {
    const order = await POS.findOneAndUpdate(
      { tableNO },
      { tableStatus },
      { new: true }
    );

    if (!order) {
      return res
        .status(404)
        .json({ message: "Order not found for this table" });
    }

    return res.status(200).json({
      message: "Table status updated successfully",
      order,
    });
  } catch (error) {
    console.error("Error updating table status:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const getAllOrders = async (req: Request, res: Response) => {
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

export const deleteOrder = async (req: Request, res: Response) => {
  const tableNO = req.params.tableNO;

  try {
    const deletedOrder = await POS.findOneAndDelete({ tableNO });

    if (!deletedOrder) {
      return res
        .status(404)
        .json({ message: "Order not found for this table" });
    }

    return res.status(200).json({
      message: "Order deleted successfully",
      deletedOrder,
    });
  } catch (error) {
    console.error("Error deleting order:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

const updateIngredients = async (menuItems: any[]) => {
  try {
    for (const menuItem of menuItems) {
      const { ingredients } = menuItem;

      for (const ingredient of ingredients) {
        const { name, properties } = ingredient;
        
       
        const inventoryItem = await inventory.findOne({ ingredient: name });

        if (inventoryItem) {
          
          const prevStock = typeof inventoryItem.prevStock === 'number' ? inventoryItem.prevStock : 0;          
          const newPrevStock = prevStock - properties.quantity;
          
          inventoryItem.prevStock = newPrevStock >= 0 ? newPrevStock : 0;
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


