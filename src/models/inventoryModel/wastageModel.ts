import mongoose, { Schema } from 'mongoose';
import { IUser } from '../../interfaces/userInterface';

export interface Iwastage {
  ingredient: string;
  unit: string;
  quantity: number;
  wastageDate: Date;
  user: IUser;
  organizationName: string;
}

const wastageSchema: Schema = new Schema<Iwastage>({
  ingredient: { type: String },
  unit: { type: String },
  quantity: { type: Number },
  wastageDate: { type: Date },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  organizationName: { type: String },
});

const wastageDetails = mongoose.model('Wastage', wastageSchema);
export default wastageDetails;
