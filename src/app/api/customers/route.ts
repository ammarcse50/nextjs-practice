import prisma from "@/lib/connectDB";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const getAllCutomers = await prisma.customers.findMany({});
 
  return Response.json(getAllCutomers);
}
