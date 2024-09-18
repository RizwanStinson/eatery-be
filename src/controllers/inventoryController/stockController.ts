import { Request, Response } from 'express';
import fs from 'fs/promises';
import path from 'path';
import inventory from '../../models/inventoryModel/inventoryModel';
import OrderIngredients from '../../models/inventoryModel/orderIngredients';
import order from '../../models/inventoryModel/stockModel';

const stockController = async (req: Request, res: Response) => {
  try {
    // Load vendor data from JSON file
    const filePath = path.join(__dirname, '../../../vendorList.json');
    const jsonData = await fs.readFile(filePath, 'utf8');
    const dummyData = JSON.parse(jsonData);

    // Create new order based on request body
    const { ingredients, cost } = req.body;
    const newOrder = await OrderIngredients.create({ ingredients, cost });

    // Array to store updated inventory items
    const updatedInventoryItems = [];

    // Loop through each ingredient in the new order
    for (const ingredient of newOrder.ingredients) {
      const {
        ingredient: ingredientName,
        quantity,
        unit,
        deliveryDate,
      } = ingredient;

      // Match the ingredient from the vendor data (dummyData)
      const matchedItem = dummyData.find(
        (item: { itemName: string }) => item.itemName === ingredientName
      );

      if (matchedItem) {
        // Find the corresponding inventory item by name
        let updateInventory = await inventory.findOne({
          ingredient: ingredientName,
        });

        if (updateInventory) {
          // Update inventory fields based on the matched data and order
          updateInventory.prevStock = updateInventory.currentStock;
          updateInventory.prevExpiary = updateInventory.newStockExpiry;
          updateInventory.currentStock = quantity;
          updateInventory.newStock = quantity;
          updateInventory.newStockExpiry = new Date(deliveryDate);
          updateInventory.unit = unit;
          updateInventory.cost = matchedItem.price;
          await updateInventory.save();
        } else {
          // Create new inventory item if it doesn't exist
          updateInventory = await inventory.create({
            ingredient: ingredientName,
            currentStock: quantity,
            unit,
            cost: matchedItem.price,
            newStock: quantity,
            newStockExpiry: new Date(deliveryDate),
          });
        }
        updatedInventoryItems.push(updateInventory);
        console.log(
          `Updated inventory for ${ingredientName}:`,
          updateInventory
        );
      } else {
        console.log(`No match found for ingredient: ${ingredientName}`);
      }
    }

    // Save the new order to the stock order model
    const recentOrder = await order.create({
      ingredients: newOrder.ingredients,
      cost: newOrder.cost,
    });

    res.status(200).json({
      message: 'Order placed and inventory updated',
      recentOrder,
      updatedInventoryItems,
    });
  } catch (error) {
    console.error('Error processing the order and updating inventory:', error);
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: 'An unknown error occurred' });
    }
  }
};

export default stockController;
