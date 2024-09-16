import { Schema, model } from "mongoose";
import { IPos } from "../../interfaces/posInterface";

const IngredientPropertiesSchema = new Schema({
  quantity: { type: Number, required: true },
  unit: { type: String, required: true },
});

const IngredientSchema = new Schema({
  name: { type: String, required: true },
  properties: { type: IngredientPropertiesSchema, required: true },
});

const AddOnSchema = new Schema({
  name: { type: String, required: true },
  quantity: { type: Number, required: true },
  unit: { type: String, required: true },
  addonPrice: { type: Number, required: true }, // Added addOn price
});

const MenuSchema = new Schema({
  name: { type: String, required: true },
  category: { type: String, required: true },
  tastyTag: { type: String, required: true },
  size: { type: String, required: true }, // Changed size to string
  ingredients: { type: [IngredientSchema], required: true },
  sellingPrice: { type: Number, required: true },
  addOns: { type: [AddOnSchema], required: true },
  quantity: { type: Number, required: true },
});

const POSSchema = new Schema(
  {
    tableNO: { type: Number, required: true },
    tableStatus: { type: String, required: true },
    menuItems: { type: [MenuSchema], required: true },
    preparationTime: { type: Number, required: true },
    totalPrice: { type: Number, required: true },
  },
  {
    timestamps: true,
  }
);

export const POS = model<IPos>("POS", POSSchema);
