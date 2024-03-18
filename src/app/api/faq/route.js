import connectMongoDB from "../../../../config/dbConnect";
import Faq from "../../models/faq";
import { NextResponse } from "next/server";

export async function POST(request) {
  const {
    question,
    answer,
  } = await request.json();
  await connectMongoDB();

  await Faq.create({
    question,
    answer,
  });
  console.log(
    
  );
  return NextResponse.json({ message: "Faq Created Successfully" }, { status: 201 });
}

export async function GET() {
  await connectMongoDB();
  const Faqs = await Faq.find();
  return NextResponse.json({ Faqs });
}



export async function DELETE(request) {
  const id = request.nextUrl.searchParams.get("id");
  await connectMongoDB();
  await Faq.findByIdAndDelete(id);
  return NextResponse.json({ message: "Faq deleted" }, { status: 201 });
}