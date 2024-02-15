// pages/api/roles/edit.js
import Role from "../../../models/role";
import connectMongoDB from "../../../../config/dbConnect";
import { NextResponse } from "next/server";

export default async function handler(request) {
  if (request.method === "PUT") {
    return handlePut(request);
  }

  return NextResponse.json({ message: "Method not Allowed" }, { status: 405 });
}

export async function handlePut(request) {
  const parsedBody = await request.json();
  const { id, name, description, permission } = parsedBody;

  try {
    await connectMongoDB();
    const existingRole = await Role.findById(id);

    if (!existingRole) {
      return NextResponse.json({ message: "Role not found" }, { status: 404 });
    }

    // Update the role properties
    existingRole.name = name;
    existingRole.description = description;
    existingRole.permission = permission;

    // Save the updated role
    await existingRole.save();

    return NextResponse.json(
      { message: "Role updated successfully" },
      { status: 200 }
    );
  } catch (err) {
    console.error("Error updating role: ", err);
    return NextResponse.json(
      { message: "Failed to update the role" },
      { status: 500 }
    );
  }
}
