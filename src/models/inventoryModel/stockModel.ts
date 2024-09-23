import mongoose, { Schema } from "mongoose";
import { Istock } from "../../interfaces/inventoryInterface/interfaces";

const stockSchema: Schema = new Schema<Istock>({
  name: { type: String },
  cost: { type: Number },
  stock: { type: Number },
  expiry: { type: Date },
  organizationName: {
    type: String,
    required: true,
  },
});

const order = mongoose.model("order", stockSchema);

export default order;
