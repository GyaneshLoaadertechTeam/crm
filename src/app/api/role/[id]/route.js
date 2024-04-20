// Import dependencies
import Role from "../../../models/role";
import connectMongoDB from "../../../../../config/dbConnect";

// Handle PUT requests
export async function put(req, res) {
    // Parse request body
    const { id, name, description, permission } = req.body;

    try {
        // Connect to the database
        await connectMongoDB();

        // Find the role by ID
        const existingRole = await Role.findById(id);
        if (!existingRole) {
            // Return a 404 error if the role is not found
            return res.status(404).json({ message: "Role not found" });
        }

        // Update the role's properties
        existingRole.name = name;
        existingRole.description = description;
        existingRole.permission = permission;

        // Save the updated role
        await existingRole.save();

        // Return a success response
        return res.status(200).json({ message: "Role updated successfully" });
    } catch (err) {
        // Log and return an error response if something goes wrong
        console.error("Error updating role: ", err);
        return res.status(500).json({ message: "Failed to update the role" });
    }
}

// Optionally, handle other HTTP methods if needed
// export async function get(req, res) { ... }
// export async function del(req, res) { ... }
