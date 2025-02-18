import prisma from "@/lib/connectDB";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {}

// /pages/api/create.ts
export async function POST(req: NextRequest, res: NextResponse) {
  const data = await req.json();

  console.log(data);

  try {
    const user = await prisma.user.create({
      data: data,
    });

    return Response.json({ user, success: "true" });
  } catch (error) {
    return Response.json({ error: "Error creating user" });
    console.log("Error creating user:", error);
  }
}
