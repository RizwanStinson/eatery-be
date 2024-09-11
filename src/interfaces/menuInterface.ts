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
}
