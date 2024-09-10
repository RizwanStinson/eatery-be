export interface Idetails {
  name: string;
  currentStock: number;
  unit: string;
  unitCost: number;
  orderPoint: number;
  prevStock: number;
  newStock: number;
  prevStockExpiry: Date;
  newStockIncoming: Date;
  newStockExpiry: Date;
}
