import { Document } from "mongoose";

export interface IAllEmployee extends Document {
  firstName: string;
  lastName: string;
  organizationName: string;
  userType: string;
  email: string;
  phone: string;
}
