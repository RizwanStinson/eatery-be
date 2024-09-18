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
  size: string;
  ingredients: Iingredient[];
  preparationTime: number;
  sellingPrice: number;
  addOns: IaddOn[];
  quantity: number;
  totalPrice: number;
}

export interface IPos {
  tableNO: number;
  tableStatus: string;
  menuItems: Imenu[];
  optionalNotes?: string;
}
