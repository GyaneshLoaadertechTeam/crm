import connectMongoDB from "../../../../../config/dbConnect";
import Lead from "../../../models/lead";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  const { id } = params;
  await connectMongoDB();
  const lead = await Lead.findOne({ _id: id });
  return NextResponse.json({ lead }, { status: 200 });
}

export async function PUT(request, { params }) {
  const { id } = params;
  const data = await request.json();
  console.log(data);

  await connectMongoDB();

  // Assuming 'Lead' is your Mongoose model
  const response=await Lead.findByIdAndUpdate(id, {
    name: data.name,
    phone: data.phone,
    email: data.email,
    city: data.city,
    serviceType: data.serviceType,
    goodsType: data.goodsType,
    vehicleType: data.vehicleType,
    leadType: data.leadType,
    leadStatus: data.leadStatus,
    remarks: data.remarks,
    date:data.date
  }, { new: true });


  return NextResponse.json({ message: "Lead Updated" }, { status: 201 });
}
