import mongoose, { Schema } from 'mongoose';

export interface Iwastage {
  ingredient: string;
  unit: string;
  quantity: number;
  wastageDate: Date;
}

const wastageSchema: Schema = new Schema<Iwastage>({
  ingredient: { type: String },
  unit: { type: String },
  quantity: { type: Number },
  wastageDate: { type: Date },
});

const wastageDetails = mongoose.model('Wastage', wastageSchema);
export default wastageDetails;
