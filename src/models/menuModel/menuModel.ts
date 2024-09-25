import mongoose, { Schema } from 'mongoose';
import {
  Imenu,
  Isize,
  ImealTime,
  IaddOn,
  Iingredient,
} from '../../interfaces/inventoryInterface/interfaces';

const ingredientSchema: Schema = new Schema<Iingredient>({
  name: { type: String, required: true },
  properties: {
    quantity: { type: Number, required: true },
    unit: { type: String, required: true },
  },
});

const addOnSchema: Schema = new Schema<IaddOn>({
  name: { type: String, required: true },
  quantity: { type: Number, required: true },
  unit: { type: String, required: true },
  addonPrice: { type: Number, required: true },
});

const mealTimeSchema: Schema = new Schema<ImealTime>({
  mealtime: { type: String, required: true },
});

const sizeSchema: Schema = new Schema<Isize>({
  sizeName: { type: String, required: true },
  ingredients: [ingredientSchema],
  preparationTime: { type: Number, required: true },
  sellingPrice: { type: Number, required: true },
  addOns: [addOnSchema],
});

const menuSchema: Schema = new Schema<Imenu>({
  name: { type: String, required: true },
  category: { type: String, required: true },
  mealTime: [mealTimeSchema],
  description: { type: String },
  image: { type: String },
  size: { type: [sizeSchema], required: false },
});

const menu = mongoose.model('menu', menuSchema);

export default menu;
