export interface Iaddingredient {
  ingredient: string;
  unit: string;
  poo: number;
  capacity: number;
  organizationName: string;
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
  organizationName: string;
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
  organizationName: string;
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

export interface ImealTime {
  mealtime: string;
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
  mealTime: ImealTime[];
  description: string;
  image: string;
  size: Isize[];
  quantity: number;
  totalPrice: number;
  organizationName: String;
}
