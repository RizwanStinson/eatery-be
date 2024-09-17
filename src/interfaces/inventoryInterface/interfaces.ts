export interface Iaddingredient {
  ingredient: string;
  unit: string;
  poo: number;
  capacity: number;
}

export interface Idetails {
  ingredient: string;
  currentStock: number;
  unit: string;
  cost: number;
  poo: number;
  prevStock: number;
  prevExpiary: Date;
  newStock: number;
  newStockExpiry: Date;
  capacity: number;
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
  mealTime: string;
  description: string;
  size: Isize[];
}
