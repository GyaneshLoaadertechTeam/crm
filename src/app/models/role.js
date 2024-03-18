import mongoose, { Schema } from "mongoose";

const RecordSchema = new Schema({
  feature: String,
  read: Boolean,       // Change type to Boolean
  create: Boolean,     // Change type to Boolean
  update: Boolean,     // Change type to Boolean
  fullAccess: Boolean  // Change type to Boolean
});

const RoleSchema = new Schema(
  {
    name: String,
    description: String,
    permission: [RecordSchema] 
  },
  { timestamps: true }
);

const Role = mongoose.models.Role || mongoose.model("Role", RoleSchema);

export default Role;