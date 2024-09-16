import { Document, ObjectId } from "mongoose";
import { IOrganization } from "../models/organizations/organizationModel";

export interface IUser extends Document {
  firstName: string;
  lastName: string;
  organization: ObjectId | IOrganization; 
  userType: string;
  email: string;
  phone: number;
  password: string;
}
