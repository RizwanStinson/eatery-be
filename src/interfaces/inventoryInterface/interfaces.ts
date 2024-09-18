import { Types } from "mongoose";


export interface Iaddingredient {
  name: string;
  unit: string;
  orderPoint: number;
  capacity: number;
  organization: Types.ObjectId;
}

export interface Idetails {
  name: string;
  currentStock: number;
  unit: string;
  unitCost: number;
  orderPoint: number;
  prevStock: number;
  prevStockExpiry: Date;
  newStock: number;
  newStockExpiry: Date;
  capacity: number;
  organization: Types.ObjectId;
}

export interface Idummy {
  itemName: string;
  unit: string;
  expiryDate: Date;
  price: number;
  stock: number;
}

export interface Istock {
  name: string;
  cost: number;
  stock: number;
  expiry: Date;
  organization: Types.ObjectId;
}

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
  addonPrice: number;
}

export interface Isize {
  sizeName: string;
  ingredients: Iingredient[];
  preparationTime: number;
  sellingPrice: number;
  addOns: IaddOn[];
}

export interface Imenu {
  name: string;
  category: string;
  tastyTag: string;
  mealTime: string;
  description: string;
  size: Isize[];
  quantity: number;
  totalPrice: number;
  organization: Types.ObjectId;
}
