import connectMongoDB from "../../../../../config/dbConnect";
import User from "../../../models/user";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "johndoe@example.com" },
        password: { label: "Password", type: "password" }
      },

      async authorize(credentials) {
        const { email, password } = credentials;

        try {
          await connectMongoDB();
          const user = await User.findOne({ email });
          console.log(user);

          if (!user) {
            throw new Error('No user found with the provided email.');
          }

          // Using bcrypt to compare the provided password with the hashed password in the database
          const isMatch = await bcrypt.compare(password, user.password);

          if (!isMatch) {
            throw new Error('Password does not match.');
          }

          return user;
          log
        } catch (error) {
          console.error("Error: ", error);
          throw new Error('Authentication failed.');
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/",
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
