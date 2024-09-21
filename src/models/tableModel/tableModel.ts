import { Schema, model } from "mongoose";
import { Itabledetails } from "../../interfaces/inventoryInterface/interfaces";

const TabledetailsSchema = new Schema({
  number: { type: Number, required: true },
  capacity: { type: Number, required: true },
});

export const Table = model<Itabledetails>("tablePOS", TabledetailsSchema);
