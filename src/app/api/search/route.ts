import prisma from "@/lib/connectDB";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const query = searchParams.get("query");

  // Validate the query parameter
  if (!query || query.trim() === "") {
    return NextResponse.json(
      { message: "Query parameter is required and must not be empty." },
      { status: 400 }
    );
  }

  try {
    // Fetch data using Prisma with a case-insensitive `contains` operator
    const results = await prisma.item.findMany({
      where: {
        name: {
          contains: query.toLowerCase(),
              // For case-insensitive search (MariaDB/MySQL support)
        },
      },
      take: 10, // Optional: Limit results to 10
    });

    // Return the results as JSON
    return NextResponse.json(results);
  } catch (error) {
    console.error("Error fetching suggestions:", error);

    // Return an error response
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
