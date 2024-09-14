import { Request, Response } from "express";
import order from "../../models/inventoryModel/stockModel";
import inventory from "../../models/inventoryModel/inventoryModel";
import fs from "fs";
import path from "path";

const stockController = async (req: Request, res: Response) => {
  try {
    const filePath = path.join(__dirname, "../../../vendorList.json");
    const jsonData = fs.readFileSync(filePath, "utf8");
    const dummyData = JSON.parse(jsonData);
    console.log("dummy from here: ", dummyData);

    const newOrder = {
      name: req.body.name,
      stock: req.body.stock,
    };
    console.log("new Order:", newOrder);

    const orderName = newOrder.name;
    const matchedItem = dummyData.find(
      (item: { itemName: string }) => item.itemName === orderName
    );
    if (matchedItem) {
      const updateInventory = await inventory.findOne({ name: req.body.name });
      console.log("Data from atlas:", updateInventory);
      if (updateInventory) {
        updateInventory.prevStock = req.body.stock;
        updateInventory.prevStockExpiry = matchedItem.expiryDate;
        updateInventory.unitCost = matchedItem.price;
        await updateInventory.save();
        return res.status(200).json(updateInventory);
      }
      console.log("Matched Item: ", matchedItem);
    } else {
      console.log("No match found for the order name.");
    }
    const recentOrder = await order.create(newOrder);
    res.status(200).send(recentOrder);
  } catch (error) {
    console.error("Error creating new order:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
export default stockController;