import { addDays } from 'date-fns';
import { Response } from 'express';
import fs from 'fs/promises';
import { ExtendedRequest } from '../../interfaces/extendedRequest';
import inventory from '../../models/inventoryModel/inventoryModel';
import OrderIngredients from '../../models/inventoryModel/orderIngredients';
import order from '../../models/inventoryModel/stockModel';

export const stockController = async (req: ExtendedRequest, res: Response) => {
  try {
    const filePath = require('path').join(
      __dirname,
      '../../../vendorList.json'
    );
    const jsonData = await fs.readFile(filePath, 'utf8');
    const dummyData = JSON.parse(jsonData);

    const { ingredients, cost } = req.body;
    const newOrder = await OrderIngredients.create({
      ingredients,
      cost,
      // user: user!._id,
    });

    const updatedInventoryItems = [];

    for (const ingredient of newOrder.ingredients) {
      const {
        ingredient: ingredientName,
        quantity,
        unit,
        deliveryDate,
      } = ingredient;

      const matchedItem = dummyData.find(
        (item: { itemName: string }) => item.itemName === ingredientName
      );

      if (matchedItem) {
        let updateInventory = await inventory.findOne({
          ingredient: ingredientName,
          // user: user!._id,
        });

        if (updateInventory) {
          // Scenario 1: prevStock is 0, update prevStock and prevExpiary
          if (updateInventory.prevStock === 0) {
            updateInventory.prevStock = quantity;
            updateInventory.prevExpiary = addDays(new Date(deliveryDate), 4);
            updateInventory.currentStock = quantity; // Set currentStock to the new quantity
          }
          // Scenario 2: prevStock is not 0, update newStock and newStockExpiry
          else {
            updateInventory.newStock =
              (updateInventory.newStock as number) + quantity;
            updateInventory.newStockExpiry = addDays(new Date(deliveryDate), 4);
            updateInventory.currentStock =
              (updateInventory.prevStock as number) +
              (updateInventory.newStock as number);
          }

          updateInventory.unit = unit;
          updateInventory.cost = matchedItem.price;
          updateInventory.incomingStock = new Date(deliveryDate);

          await updateInventory.save();
        }
        // If the inventory item doesn't exist, create a new entry
        else {
          updateInventory = await inventory.create({
            ingredient: ingredientName,
            currentStock: quantity,
            unit,
            cost: matchedItem.price,
            prevStock: quantity,
            newStock: 0,
            prevExpiary: addDays(new Date(deliveryDate), 4),
            incomingStock: new Date(deliveryDate),
            // user: user?._id,
          });
        }
        updatedInventoryItems.push(updateInventory);
      } else {
        console.log(`No match found for ingredient: ${ingredientName}`);
      }
    }

    const recentOrder = await order.create({
      ingredients: newOrder.ingredients,
      cost: newOrder.cost,
      // user: user?._id,
    });

    res.status(201).json({
      message: 'Order placed and inventory updated',
      recentOrder,
      updatedInventoryItems,
    });
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: 'An unknown error occurred' });
    }
  }
};
