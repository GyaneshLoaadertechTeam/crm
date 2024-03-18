import connectMongoDB from "../../../../config/dbConnect";
import User from '../../models/user';
import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

connectMongoDB();

export const POST = async (NextRequest) => {
    try {
        const body = await NextRequest.json();
        const { email, password } = body;

        if (!email || !password) {
            return new Response("Email and password are required", { status: 401 });
        }

        // Directly find the user by email and plaintext password
        const user = await User.findOne({ email, password });
        if (!user) {
            return new Response("Email does not exist or password is incorrect", { status: 400 });
        }

        const tokenData = {
            email: user.email,
            id: user._id
        };

        const token = jwt.sign(tokenData, process.env.JWT_SECRETKEY, { expiresIn: '5s' });
        console.log(`Generated Token: ${token}`);

        const response = NextResponse.json({ message: "Login successful" });
        
        response.cookies.set("token", token, { httpOnly: true, sameSite: 'strict' }); // Enhance cookie security with SameSite attribute
        return response;
    } catch (error) {
        console.log("Error", error.message);
        return new Response("Something went wrong", { status: 500 });
    }
}
