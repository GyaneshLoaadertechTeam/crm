import connectMongoDB from "../../../config/dbConnect";
import driverLead from "../../models/driverLead";
import { NextResponse } from "next/server";

export async function POST(request) {
  const {
    name,
    phone,
    email,
    vehicleNumber,
    vehicleType,
    leadType,
    remarks,
    leadStatus,
    date
  } = await request.json();
  await connectMongoDB();

  await driverLead.create({
    name,
    phone,
    email,
    vehicleNumber,
    vehicleType,
    leadType,
    remarks,
    leadStatus,
    date
  });
  return NextResponse.json({ message: "driverLead Created Successfully" }, { status: 201 });
}

export async function GET() {
  await connectMongoDB();
  const driverlead = await driverLead.find();
  console.log(driverlead);
  return NextResponse.json({ driverlead });
}

export async function DELETE(request) {
  const id = request.nextUrl.searchParams.get("id");
  await connectMongoDB();
  await driverLead.findByIdAndDelete(id);
  return NextResponse.json({ message: "driverLead deleted" }, { status: 201 });
}