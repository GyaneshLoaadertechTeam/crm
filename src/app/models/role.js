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
    name: { 
      type: String,
      required: true,
      unique: true,  // Enforces uniqueness on the 'name' field
      trim: true,  // Removes whitespace from both ends of a string
    },
    description: String,
    permission: [RecordSchema] 
  },
  { timestamps: true }
);

const Role = mongoose.models.Role || mongoose.model("Role", RoleSchema);

export default Role;