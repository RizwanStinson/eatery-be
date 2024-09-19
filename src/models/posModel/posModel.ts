import mongoose, { Schema, Document } from "mongoose";

const IngredientSchema = new Schema({
  name: { type: String, required: true },
  properties: {
    quantity: { type: Number, required: true },
    unit: { type: String, required: true },
  },
});

const AddOnSchema = new Schema({
  name: { type: String, required: true },
  quantity: { type: Number, required: true },
  unit: { type: String, required: true },
  addonPrice: { type: Number, required: true },
});

const MenuSchema = new Schema({
  itemName: { type: String, required: true },
  //category: { type: String, required: true },
  selectedSize: { type: String, required: true },
  ingredients: { type: [IngredientSchema], required: true },
  preparationTime: { type: Number, required: true },
  sellingPrice: { type: Number, required: true },
  addOns: { type: [AddOnSchema], required: true },
  quantity: { type: Number, required: true },
  totalPrice: { type: Number, required: true },
});

const POSSchema = new Schema({
  tableNo: { type: Number, required: true },
  tableStatus: { type: String, required: true },
  menuItems: { type: [MenuSchema], required: true },
  optionalNotes: { type: String },
  organization: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "Organization",
  },
});

const POS = mongoose.model("POS", POSSchema);

export default POS;
