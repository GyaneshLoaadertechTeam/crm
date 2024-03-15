import Role from "../../models/role";
import connectMongoDB from "../../../config/dbConnect";
import { NextResponse } from "next/server";
import checkRole from "../middlewares/checkRole";


export async function POST(request) {
  const parsedBody = await request.json();
  const isAuthorized = checkRole(['admin', 'editor'], parsedBody);
  if (!isAuthorized) {
    return NextResponse.json({ message: "Not Accessable" }, { status: 401 });
  }
  if (request.method !== 'POST') {
  return NextResponse.json({ message: "Method not Allowed" }, { status: 405 });
  }
  const { 
    name,
    description,
    permission
   } = parsedBody;
  await connectMongoDB();
  const newRole = new Role({name,description,permission});
  try {
    await newRole.save();
  return NextResponse.json({ message: "Role Created Successfully" }, { status: 201 });
  } catch (err) {
    console.error("Error creating role: ", err);
  return NextResponse.json({ message: "Fail to save the Role" }, { status: 505 });
  }
 
}
export async function GET() {
  try {
    await connectMongoDB();
    const roles = await Role.find({});
    return NextResponse.json({ roles }, { status: 200 });
  } catch (err) {
    console.error("Error fetching roles: ", err);
    return NextResponse.json({ message: "Fail to fetch roles" }, { status: 500 });
  }
}
