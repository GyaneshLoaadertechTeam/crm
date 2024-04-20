import connectMongoDB from "../../../../config/dbConnect";
import User from '../../models/user';
import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import bcrypt from 'bcryptjs'; // Import bcryptjs for password hashing

export async function POST(request) {
  const formData = await request.formData();
  const name = formData.get('name');
  const number = formData.get('number');
  const email = formData.get('email');
  const roleId = formData.get('roleId');
  const gender = formData.get('gender');
  const address = formData.get('address');
  const password = formData.get('password');
  const profilePhotoFile = formData.get('profilePhoto');

  // Save the file to the assets folder and get the file path
  const assetsFolderPath = path.join(process.cwd(), 'assets');
  if (!fs.existsSync(assetsFolderPath)) {
    fs.mkdirSync(assetsFolderPath);
  }
  const filePath = path.join(assetsFolderPath, profilePhotoFile.name);
  // Use arrayBuffer() to get the file contents
  const fileBuffer = await profilePhotoFile.arrayBuffer();
  fs.writeFileSync(filePath, Buffer.from(fileBuffer));

  const profilePhotoPath = `assets/${profilePhotoFile.name}`;

  await connectMongoDB();

  // Hash the password before storing it in the database
  const hashedPassword = await bcrypt.hash(password, 10);

  await User.create({
    name,
    number,
    email,
    roleId,
    gender,
    address,
    password: hashedPassword, // Store the hashed password
    profilePhoto: profilePhotoPath,
  });

  return NextResponse.json({ message: 'User Created Successfully' }, { status: 201 });
}

export async function GET() {
  await connectMongoDB();
  const users = await User.find();

  // Assuming your server is hosted at 'http://localhost:3000'
  const serverUrl = 'http://localhost:3000/';

  const usersWithFileUrls = users.map(user => {
    if (user.profilePhoto) {
      // Construct the full URL for the profile photo
      user.profilePhoto = `${serverUrl}${user.profilePhoto}`;
    }
    return user;
  });

  return NextResponse.json({ users: usersWithFileUrls });
}

export async function DELETE(request) {
  const id = request.nextUrl.searchParams.get('id');
  await connectMongoDB();
  await User.findByIdAndDelete(id);
  return NextResponse.json({ message: 'User deleted' }, { status: 201 });
}
