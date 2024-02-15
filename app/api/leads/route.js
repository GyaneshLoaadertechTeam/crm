import connectMongoDB from "../../../config/dbConnect";
import Lead from "../../models/lead";
import { NextResponse } from "next/server";

export async function POST(request) {
  const {
    name,
    phone,
    email,
    city,
    serviceType,
    goodsType,
    vehicleType,
    leadType,
    remarks,
    date,
    leadStatus
  } = await request.json();
  await connectMongoDB();

  await Lead.create({
    name,
    phone,
    email,
    city,
    serviceType,
    goodsType,
    vehicleType,
    leadType,
    remarks,
    date,
    leadStatus
  });
  console.log(
    
  );
  return NextResponse.json({ message: "Lead Created Successfully" }, { status: 201 });
}

export async function GET() {
  await connectMongoDB();
  const Leads = await Lead.find();
  return NextResponse.json({ Leads });
}



export async function DELETE(request) {
  const id = request.nextUrl.searchParams.get("id");
  await connectMongoDB();
  await Lead.findByIdAndDelete(id);
  return NextResponse.json({ message: "Lead deleted" }, { status: 201 });
}