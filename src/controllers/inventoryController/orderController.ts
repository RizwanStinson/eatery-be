import { Response } from 'express';
import { ExtendedRequest } from '../../interfaces/extendedRequest';
import OrderIngredients from '../../models/inventoryModel/orderIngredients';

export const orderIngredient = async (req: ExtendedRequest, res: Response) => {
  const { ingredients, cost } = req.body;
  const { user } = req;

  // Validate required fields
  if (!ingredients || !cost) {
    return res
      .status(400)
      .json({ message: "Ingredients and cost are required" });
  }

  try {
    // Create the new order ingredient
    const newOrder = await OrderIngredients.create({
      ingredients,
      cost,
      user: user?._id,
    });

    // Return the created order with a success response
    return res
      .status(201)
      .json({ message: "Order created successfully", newOrder });
  } catch (error) {
    const err = error as Error;
    console.error("Error creating order:", error);

    // Handle the error with a proper error message
    return res.status(500).json({
      message: "Failed to create order",
      error: err.message || "An unknown error occurred",
    });
  }
};
