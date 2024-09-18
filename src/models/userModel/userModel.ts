import mongoose, { Schema, Document } from "mongoose";
import { IUser } from "../../interfaces/userInterface";
import { IOrganization } from "../organizations/organizationModel";

const allowedUserTypes = [
  "Admin",
  "POSManager",
  "InventoryManager",
  "MenuManager",
];

const userSchema = new Schema<IUser>({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  organization: {
    type: Schema.Types.ObjectId,
    ref: "Organization",
    required: true,
  },
  userType: {
    type: String,
    required: true,
    enum: allowedUserTypes,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phone: {
    type: Number,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const User = mongoose.model<IUser>("User", userSchema);
export default User;
