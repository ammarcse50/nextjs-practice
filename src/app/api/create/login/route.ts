import bcrypt from "bcryptjs";
import prisma from "@/lib/connectDB"; // Make sure this path is correct
import { NextRequest, NextResponse } from "next/server";

// If you need the GET function, implement it. Otherwise, remove it.
// export async function GET() {}

export async function POST(req: NextRequest) {
  const { email, password } = await req.json();
  console.log(email, password);
  try {
    // Find user by email
    const user = await prisma.user.findFirst({
      where: { email },
    });
    console.log(user);
    if (!user) {
      return NextResponse.json({ message: "User not found." }, { status: 404 });
    }

    // Compare the hashed password with the input password
    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (isPasswordCorrect) {
      // Password is correct, return user data (exclude password)
      return NextResponse.json({
        success: "true",
        user: { email: user.email, name: user.name },
      });
    } else {
      return NextResponse.json(
        { message: "Invalid password." },
        { status: 401 }
      );
    }
  } catch (error) {
    console.error("Error during login:", error);
    return NextResponse.json(
      { message: "Internal server error." },
      { status: 500 }
    );
  }
}
