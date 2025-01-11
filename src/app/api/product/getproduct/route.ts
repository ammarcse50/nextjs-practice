import prisma from "@/lib/connectDB";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const getAllCutomers = await prisma.item.findMany({
    include: {
      item_category: true,
    },
  });

  console.log(getAllCutomers);
  return Response.json(getAllCutomers);
}
