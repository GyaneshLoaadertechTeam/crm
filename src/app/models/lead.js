import mongoose, { Schema, mongo } from "mongoose";
const LeadSchema = new Schema(
  {
    name: String,
    phone: String,
    email: String,
    city: String,
    serviceType: String,
    goodsType: String,
    vehicleType: String,
    leadType: String,
    leadStatus: String,
    remarks: String,
    date:String,
  },
  { timestamps: true }
);

// const Topic = mongoose.models.Topic || mongoose.model("Topic", RoleSchema);
const Lead = mongoose.models.Lead || mongoose.model("Lead", LeadSchema);

export default Lead;
