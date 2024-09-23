import mongoose, { Schema } from "mongoose";
import { Iaddingredient } from "../../interfaces/inventoryInterface/interfaces";

const addIngredientSchema: Schema = new Schema<Iaddingredient>({
  ingredient: { type: String, required: true },
  unit: { type: String, required: true },
  poo: { type: Number, required: true },
  capacity: { type: Number, required: true },
  organizationName: {
    type: String,
    required: true,
  },
});

const newIngredient = mongoose.model("NewIngredient", addIngredientSchema);

export default newIngredient;
