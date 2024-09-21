import mongoose, { Schema, Document } from 'mongoose';
import { IAllEmployee } from '../../interfaces/allEmployeeInterface';

const allEmployeeSchema: Schema = new Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    organizationName: { type: String, required: true },
    userType: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
  });
  
  const allEmployee = mongoose.model<IAllEmployee>('Hr', allEmployeeSchema);
  export default allEmployee;