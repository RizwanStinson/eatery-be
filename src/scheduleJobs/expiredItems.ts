import { scheduleJob } from 'node-schedule';
import inventory from '../models/inventoryModel/inventoryModel';

export const expiredItems = scheduleJob('0 0 * * *', () => {
  console.log('expired items');
  const expiredItems = async () => {
    const items = await inventory.updateMany(
      { prevExpiary: { $lt: new Date() } },
      [
        {
          $set: {
            prevStock: 0,
            currentStock: '$newStock', // Use aggregation pipeline to reference the field
            prevExpiary: null,
            incomingStock: null,
            newStockExpiry: null,
          },
        },
      ]
    );

    console.log(items);
    return items;
  };
  expiredItems();
});
