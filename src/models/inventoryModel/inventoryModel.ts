import mongoose, { Schema } from "mongoose";
import { Idetails } from "../../interfaces/inventoryInterface/interfaces";
const inventorySchema: Schema = new Schema<Idetails>({
  ingredient: { type: String },
  currentStock: { type: Number, default: 0 },
  unit: { type: String },
  cost: { type: Number, default: 0 },
  poo: { type: Number },
  prevStock: { type: Number, default: null },
  prevExpiary: { type: Date, default: null },
  newStock: { type: Number, default: null },
  newStockExpiry: { type: Date, default: null },
  capacity: { type: Number },
});

const inventory = mongoose.model("Inventory", inventorySchema);

export default inventory;
