import mongoose, { Schema, mongo } from "mongoose";
const driverLeadSchema = new Schema(
  {
    name: String,
    phone: String,
    email: String,
    vehicleNumber: String,
    vehicleType: String,
    leadType: String,
    leadStatus: String,
    remarks: String,
    date:String
  },
  { timestamps: true }
);

// const Topic = mongoose.models.Topic || mongoose.model("Topic", RoleSchema);
const driverLead = mongoose.models.driverLead || mongoose.model("driverLead", driverLeadSchema);

export default driverLead;
