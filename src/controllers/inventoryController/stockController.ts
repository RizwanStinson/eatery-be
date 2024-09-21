import { Request, Response } from 'express';
import fs from 'fs/promises';
import path from 'path';
import inventory from '../../models/inventoryModel/inventoryModel';
import OrderIngredients from '../../models/inventoryModel/orderIngredients';
import order from '../../models/inventoryModel/stockModel';
import { ExtendedRequest } from '../../interfaces/extendedRequest';
const { addDays } = require('date-fns');

const stockController = async (req: ExtendedRequest, res: Response) => {
  try {
    const filePath = path.join(__dirname, '../../../vendorList.json');
    const jsonData = await fs.readFile(filePath, 'utf8');
    const dummyData = JSON.parse(jsonData);

      const { user } = req;
    const { ingredients, cost } = req.body;
    const newOrder = await OrderIngredients.create({
      ingredients,
      cost,
      user: user!._id,
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
          user: user!._id,
        });

        if (updateInventory) {

          updateInventory.newStock = updateInventory.newStock as number + quantity;

          if( updateInventory.prevStock ===0){
            updateInventory.prevStock = updateInventory.newStock;
          }

            (updateInventory.prevStock as number) + quantity;

          // updateInventory.prevStock =updateInventory.newStock

          // const prev = updateInventory.prevStock as number;
          // const sum = prev + quantity;
          updateInventory.prevExpiary = updateInventory.newStockExpiry;

          updateInventory.currentStock =
            (updateInventory.prevStock as number) + (updateInventory.newStock as number);
          // updateInventory.currentStock =
          //   (updateInventory.currentStock as number) + quantity;

          updateInventory.newStockExpiry = addDays(new Date(deliveryDate), 4);
          updateInventory.unit = unit;
          updateInventory.cost = matchedItem.price;
          (updateInventory.incomingStock = new Date(deliveryDate)),
            await updateInventory.save();
        } else {
          updateInventory = await inventory.create({
            ingredient: ingredientName,
            currentStock: quantity,
            unit,
            cost: matchedItem.price,
            prevStock: quantity,
            newStock: 0,
            prevExpiary: addDays(new Date(deliveryDate), 4),
            incomingStock: new Date(deliveryDate),
            user: user?._id,
          });
        }
        updatedInventoryItems.push(updateInventory);
        // console.log(
        //   `Updated inventory for ${ingredientName}:`,
        //   updateInventory
        // );
      } else {
        console.log(`No match found for ingredient: ${ingredientName}`);
      }
    }

    const recentOrder = await order.create({
      ingredients: newOrder.ingredients,
      cost: newOrder.cost,
      user: user?._id,
    });

    res.status(200).json({
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
export default stockController;
