import mongoose, { Schema } from "mongoose";
import { Iaddingredient } from "../../interfaces/inventoryInterface/interfaces"; // Import the updated interface

const newIngredientSchema: Schema = new Schema<Iaddingredient>({
  ingredient: { type: String, required: true },
  unit: { type: String, required: true },
  poo: { type: Number, required: true },
  capacity: { type: Number, required: true },
  organization: {
    type: Schema.Types.ObjectId,
    ref: "Organization",
    required: true,
  },
});

const newIngredient = mongoose.model("NewIngredient", newIngredientSchema);

export default newIngredient;
