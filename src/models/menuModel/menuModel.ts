import mongoose, { Schema } from 'mongoose';
import {
  Imenu,
  Isize,
  ImealTime,
  IaddOn,
  Iingredient,
} from '../../interfaces/inventoryInterface/interfaces';


const ingredientSchema = new Schema<Iingredient>({
  name: { type: String, required: true },
  properties: {
    quantity: { type: Number, required: true },
    unit: { type: String, required: true },
  },
});


const addOnSchema = new Schema<IaddOn>({
  name: { type: String, required: true },
  quantity: { type: Number, required: true },
  unit: { type: String, required: true },
  addonPrice: { type: Number, required: true },
});

const mealTimeSchema: Schema = new Schema<ImealTime>({
  mealtime: { type: String, required: true },
});

const sizeSchema = new Schema<Isize>({
  sizeName: { type: String, required: true },
  ingredients: [ingredientSchema],
  preparationTime: { type: Number, required: true },
  sellingPrice: { type: Number, required: true },
  addOns: [addOnSchema],
});


const menuSchema = new Schema<Imenu>({
  name: { type: String, required: true },
  category: { type: String, required: true },
  mealTime: [mealTimeSchema],
  description: { type: String },
  image: { type: String },
  size: { type: [sizeSchema], required: true },
  quantity: { type: Number, required: true },
  totalPrice: { type: Number, required: true },
  organizationName: {
    type: String,
    required: true,
  },
});

const menu = mongoose.model('menu', menuSchema);

export default menu;
