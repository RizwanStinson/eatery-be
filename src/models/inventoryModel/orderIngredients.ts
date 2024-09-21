import { Schema, model } from 'mongoose';

const cartDataSchema = new Schema({
  ingredient: { type: String, required: true },
  unit: { type: String, required: true },
  quantity: { type: Number, required: true },
  deliveryDate: { type: String, required: true },
});

const orderIngredientsSchema = new Schema({
  ingredients: {
    type: [cartDataSchema],
    required: true,
  },
  cost: {
    type: Number,
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
});

// Create the model
const OrderIngredients = model('OrderIngredients', orderIngredientsSchema);

export default OrderIngredients;
