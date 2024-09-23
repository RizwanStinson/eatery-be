import { scheduleJob } from 'node-schedule';
import inventory from '../models/inventoryModel/inventoryModel';
import wastageDetails from '../models/inventoryModel/wastageModel';

export const expiredItems = scheduleJob('* * * * *', () => {
  console.log('Processing expired items');

  const handleExpiredItems = async () => {
    try {
      const expiredItems = await inventory.find({
        prevExpiary: { $lt: new Date() },
      });

      if (expiredItems.length > 0) {
        const wastageData = expiredItems.map((item) => ({
          ingredient: item.ingredient,
          unit: item.unit,
          wastageDate: new Date(),
          quantity: item.prevStock,
        }));
        await wastageDetails.insertMany(wastageData);
        console.log('Expired items added to wastage table:', wastageData);

        const updatedItems = await inventory.updateMany(
          { prevExpiary: { $lt: new Date() } },
          [
            {
              $set: {
                prevStock: '$newStock',
                newStock: { $divide: ['$capacity', 2] },
                currentStock: { $add: ['$newStock', '$newStock'] },
                prevExpiary: '$newStockExpiry',
                newStockExpiry: {
                  $dateAdd: {
                    startDate:'$newStockExpiry',
                    unit: 'day',
                    amount: 3,
                  },
                },
                incomingStock: { $add: new Date() },
              },
            },
          ]
        );

        console.log('Expired items updated in inventory:', updatedItems);

        return {
          success: true,
          message: `Expired items processed. ${expiredItems.length} items moved to wastage and updated in inventory.`,
        };
      } else {
        console.log('No expired items found.');
        return { success: false, message: 'No expired items found.' };
      }
    } catch (error) {
      console.error('Error processing expired items:', error);
      return { success: false, message: 'Error processing expired items.' };
    }
  };

  handleExpiredItems();
});
