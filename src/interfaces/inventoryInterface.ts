export interface Iaddingredient {
  name: string;
  unit: string;
  orderPoint: number;
  capacity: number;
}

export interface Iinfoinventory {
  name: string;
  currentStock: number;
  unit: string;
  unitCost: number;
  orderPoint: number;
  usingStock: number;
  usingStockExpiry: Date;
  newStock: number;
  newStockCame: Date;
  newStockExpiry: Date;
}

export interface Idummy {
  itemName: string;
  unit: string;
  expiryDate: Date;
  price: number;
  stock: number;
}
