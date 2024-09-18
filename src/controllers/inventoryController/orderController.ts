import { Request, Response } from 'express';
import OrderIngredients from '../../models/inventoryModel/orderIngredients';

export const orderIngredient = async (req: Request, res: Response) => {
  const { ingredients, cost } = req.body;

  // Validate required fields
  if (!ingredients || !cost) {
    return res
      .status(400)
      .json({ message: 'Ingredients and cost are required' });
  }

  try {
    // Create the new order ingredient
    const newOrder = await OrderIngredients.create({
      ingredients,
      cost,
    });

    
    // Return the created order with a success response
    return res
      .status(201)
      .json({ message: 'Order created successfully', newOrder });
  } catch (error) {
    const err = error as Error;
    console.error('Error creating order:', error);

    // Handle the error with a proper error message
    return res.status(500).json({
      message: 'Failed to create order',
      error: err.message || 'An unknown error occurred',
    });
  }
};
