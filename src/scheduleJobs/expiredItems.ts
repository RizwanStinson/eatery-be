import { scheduleJob } from 'node-schedule';
import inventory from '../models/inventoryModel/inventoryModel';
import wastageDetails from '../models/inventoryModel/wastageModel';

export const expiredItems = scheduleJob('0 0 * * *', () => {
  console.log('Processing expired items');

  const handleExpiredItems = async () => {
    try {
      // Step 1: Find expired items
      const expiredItems = await inventory.find({
        prevExpiary: { $lt: new Date() },
      });

      if (expiredItems.length > 0) {
        // Step 2: Add expired items to the wastage table
        const wastageData = expiredItems.map((item) => ({
          ingredient: item.ingredient,
          unit: item.unit,
          wastageDate: new Date(),
        }));
        await wastageDetails.insertMany(wastageData);
        console.log('Expired items added to wastage table:', wastageData);

        // Step 3: Update expired items in inventory
        const updatedItems = await inventory.updateMany(
          { prevExpiary: { $lt: new Date() } },
          [
            {
              $set: {
                prevStock: 0,
                currentStock: '$newStock', // Use aggregation pipeline to move newStock to currentStock
                prevExpiary: null,
                incomingStock: null,
              },
            },
          ]
        );
        console.log('Expired items updated in inventory:', updatedItems);

        // Step 4: Optionally, log the result
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
