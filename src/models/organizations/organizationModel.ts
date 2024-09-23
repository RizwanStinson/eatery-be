import mongoose, { Schema, Document } from "mongoose";

export interface IOrganization extends Document {
  organizationName: string;
}

const OrganizationSchema: Schema = new Schema({
  organizationName: { type: String, required: true },
});

export default mongoose.model<IOrganization>(
  "Organization",
  OrganizationSchema
);
