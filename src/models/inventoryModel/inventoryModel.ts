import mongoose, { Schema } from "mongoose";
import { Iaddingredient } from "../../interfaces/inventoryInterface";

const addIngredientSchema: Schema = new Schema<Iaddingredient>({
  name: { type: String, required: true },
  unit: { type: String, required: true },
  orderPoint: { type: Number, required: true },
  capacity: { type: Number, required: true },
});

const newIngredient = mongoose.model("Ingredient", addIngredientSchema);

export default newIngredient;
