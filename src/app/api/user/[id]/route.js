import connectMongoDB from "../../../../../config/dbConnect";
import User from '../../../models/user';
import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
export async function GET(request, { params }) {
    const { id } = params;
    await connectMongoDB();
    const user = await User.findOne({ _id: id });
    return NextResponse.json({ user }, { status: 200 });
  }
export async function PUT(request) {
    await connectMongoDB();
    const formData = await request.formData();
    const id = formData.get('id');
    const name = formData.get('name');
    const number = formData.get('number');
    const email = formData.get('email');
    const roleId = formData.get('roleId');
    const gender = formData.get('gender');
    const address = formData.get('address');
    const password = formData.get('password');
    const profilePhotoFile = formData.get('profilePhoto');
    let profilePhotoPath = '';

    if (profilePhotoFile) {
        // Save the file to the assets folder and get the file path
        const assetsFolderPath = path.join(process.cwd(), 'assets');
        if (!fs.existsSync(assetsFolderPath)) {
            fs.mkdirSync(assetsFolderPath);
        }
        const filePath = path.join(assetsFolderPath, profilePhotoFile.name);
        // Use arrayBuffer() to get the file contents
        const fileBuffer = await profilePhotoFile.arrayBuffer();
        fs.writeFileSync(filePath, Buffer.from(fileBuffer));

        profilePhotoPath = `assets/${profilePhotoFile.name}`;
    }

    const updatedData = {
        name,
        number,
        email,
        roleId,
        gender,
        address,
        password
    };

    if (profilePhotoPath) {
        updatedData.profilePhoto = profilePhotoPath;
    }

    const user = await User.findByIdAndUpdate(id, updatedData, { new: true });

    if (!user) {
        return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'User updated successfully', user });
}
