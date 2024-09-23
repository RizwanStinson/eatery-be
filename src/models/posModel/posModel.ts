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
  addonPrice: { type: Number, required: true },
});

const MenuSchema = new Schema({
  itemName: { type: String, required: true },
  quantity: { type: Number, required: true },
  selectedSize: { type: String, required: true },
  unitPrice: { type: Number, required: true },
  ingredients: { type: [IngredientSchema], required: true },
  sellingPrice: { type: Number, required: true },
  addOns: { type: [AddOnSchema], required: true },
});

const POSSchema = new Schema(
  {
    tableNo: { type: Number, required: true },
    tableStatus: { type: String, required: true },
    menuItems: { type: [MenuSchema], required: true },
    preparationTime: { type: Number, required: true },
    totalPrice: { type: Number, required: true },
    organizationName: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const POS = model<IPos>("POS", POSSchema);
