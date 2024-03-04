import connectMongoDB from '../../../config/dbConnect';
import User from '../../models/user';
import { NextResponse } from 'next/server';

export async function POST(request) {
  const {
    name,
    number,
    email,
    role,
    gender,
    address,
    password,
    profilePhoto, // Assuming you're sending the file path or URL
  } = await request.json();
  await connectMongoDB();

  await User.create({
    name,
    number,
    email,
    role,
    gender,
    address,
    password,
    profilePhoto,
  });

  return NextResponse.json({ message: 'User Created Successfully' }, { status: 201 });
}

export async function GET() {
  await connectMongoDB();
  const users = await User.find();
  return NextResponse.json({ users });
}

export async function DELETE(request) {
  const id = request.nextUrl.searchParams.get('id');
  await connectMongoDB();
  await User.findByIdAndDelete(id);
  return NextResponse.json({ message: 'User deleted' }, { status: 201 });
}
