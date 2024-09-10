import mongoose, { Schema } from "mongoose";
import { Idetails } from "../../interfaces/itemsInterface";
const allIngredientSchema: Schema = new Schema<Idetails>({
  name: { type: String },
  currentStock: { type: Number },
  unit: { type: String },
  unitCost: { type: Number },
  orderPoint: { type: Number },
  prevStock: { type: Number },
  newStock: { type: Number },
  prevStockExpiry: { type: Date },
  newStockIncoming: { type: Date },
  newStockExpiry: { type: Date },
});

const allIngredient = mongoose.model("newIngredient", allIngredientSchema);

export default allIngredient;
