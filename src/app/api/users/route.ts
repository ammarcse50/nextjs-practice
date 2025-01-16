import prisma from "@/lib/connectDB";
import { NextRequest } from "next/server";

export async function GET() {
  return await prisma.users.findMany({});
}

export async function POST(req: NextRequest) {
  const { email, password } = req.json();
  console.log(email, password);
  const res = await prisma.users.create({
    data: { email, password },
  });

  Response.json(res);
}
