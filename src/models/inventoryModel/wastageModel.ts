import mongoose, { Schema } from 'mongoose';
import { IUser } from '../../interfaces/userInterface';

export interface Iwastage {
  ingredient: string;
  unit: string;
  quantity: number;
  wastageDate: Date;
  user: IUser;
}

const wastageSchema: Schema = new Schema<Iwastage>({
  ingredient: { type: String },
  unit: { type: String },
  quantity: { type: Number },
  wastageDate: { type: Date },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
});

const wastageDetails = mongoose.model('Wastage', wastageSchema);
export default wastageDetails;
