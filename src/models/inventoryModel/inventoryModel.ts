import mongoose, { Schema } from "mongoose";
import { Idetails } from "../../interfaces/inventoryInterface/interfaces";

const inventorySchema: Schema = new Schema<Idetails>({
  name: { type: String },
  currentStock: { type: Number, default: 0 },
  unit: { type: String },
  unitCost: { type: Number, default: 0 },
  orderPoint: { type: Number },
  prevStock: { type: Number, default: null },
  prevStockExpiry: { type: Date, default: null },
  newStock: { type: Number, default: null },
  newStockExpiry: { type: Date, default: null },
  capacity: { type: Number },
  organization: {
    type: Schema.Types.ObjectId,
    ref: "Organization",
    required: true,
  }, // Add organization
});

const inventory = mongoose.model("Inventory", inventorySchema);

export default inventory;
