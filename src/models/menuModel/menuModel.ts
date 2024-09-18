import mongoose, { Schema, Document } from "mongoose";

export interface Iingredient extends Document {
  name: string;
  properties: {
    quantity: number;
    unit: string;
  };
}

const ingredientSchema = new Schema<Iingredient>({
  name: { type: String, required: true },
  properties: {
    quantity: { type: Number, required: true },
    unit: { type: String, required: true },
  },
});

export interface IaddOn extends Document {
  name: string;
  quantity: number;
  unit: string;
  addonPrice: number;
}

const addOnSchema = new Schema<IaddOn>({
  name: { type: String, required: true },
  quantity: { type: Number, required: true },
  unit: { type: String, required: true },
  addonPrice: { type: Number, required: true },
});

export interface Isize extends Document {
  sizeName: string;
  ingredients: Iingredient[];
  preparationTime: number;
  sellingPrice: number;
  addOns: IaddOn[];
}

const sizeSchema = new Schema<Isize>({
  sizeName: { type: String, required: true },
  ingredients: [ingredientSchema],
  preparationTime: { type: Number, required: true },
  sellingPrice: { type: Number, required: true },
  addOns: [addOnSchema],
});

export interface Imenu extends Document {
  name: string;
  category: string;
  tastyTag?: string;
  mealTime?: string;
  description?: string;
  size: Isize[];
  quantity: number;
  totalPrice: number;
  organization: mongoose.Types.ObjectId;
}

const menuSchema = new Schema<Imenu>({
  name: { type: String, required: true },
  category: { type: String, required: true },
  tastyTag: { type: String },
  mealTime: { type: String },
  description: { type: String },
  size: [sizeSchema],
  quantity: { type: Number, required: true },
  totalPrice: { type: Number, required: true },
  organization: {
    type: Schema.Types.ObjectId,
    ref: "Organization",
    required: true,
  },
});

const Menu = mongoose.model<Imenu>("Menu", menuSchema);
export default Menu;
