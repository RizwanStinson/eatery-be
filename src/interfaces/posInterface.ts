import { Schema } from "mongoose";

export interface IingredientProperties {
  quantity: number;
  unit: string;
}

export interface Iingredient {
  name: string;
  properties: IingredientProperties;
}

export interface IaddOn {
  name: string;
  quantity: number;
  unit: string;
  addonPrice: number; // Add addOn price here
}

export interface Isize {
  sizeName: string;
  ingredients: Iingredient[];
  preparationTime: number;
  sellingPrice: number;
  addOns: IaddOn[]; // AddOns now includes the addOnPrice
}

export interface Imenu {
  itemName: string;
  category: string;
  selectedSize: string;
  ingredients: Iingredient[];
  preparationTime: number;
  sellingPrice: number;
  addOns: IaddOn[];
  quantity: number;
  totalPrice: number; // Add total price here
}
export interface IPos {
  tableNo: number;
  tableStatus: string;
  menuItems: Imenu[];
  preparationTime: Number;
  totalPrice: Number;
  createdAt: Date;
  updatedAt: Date;
  optionalNotes?: string;
  organization: Schema.Types.ObjectId;
}
