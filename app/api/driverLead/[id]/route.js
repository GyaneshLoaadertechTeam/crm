import connectMongoDB from "@/config/dbConnect";
// import driverLead from "../../models/driverLead";
import driverLead from "../../../models/driverLead";

import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  const { id } = params;
  await connectMongoDB();
  const driverlead = await driverLead.findOne({ _id: id });
  return NextResponse.json({ driverlead }, { status: 200 });
}

export async function PUT(request, { params }) {
  const { id } = params;
  const data = await request.json();
  console.log(data);

  await connectMongoDB();

  // Assuming 'Lead' is your Mongoose model
  const response=await driverLead.findByIdAndUpdate(id, {
    name: data.name,
    phone: data.phone,
    email: data.email,
    vehicleType: data.vehicleType,
    leadType: data.leadType,
    leadStatus: data.leadStatus,
    remarks: data.remarks,
    date:data.date,
    vehicleNumber:data.vehicleNumber
  }, { new: true });


  return NextResponse.json({ message: "Driver Lead Updated" }, { status: 201 });
}
