import { Document, ObjectId } from "mongoose";
import { IOrganization } from "../models/organizations/organizationModel";

export interface IUser extends Document {
  firstName: string;
  lastName: string;
  organizationName: string; 
  userType: string;
  email: string;
  phone: string;
  password: string;
}
