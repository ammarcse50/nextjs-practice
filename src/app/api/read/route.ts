import prisma from "@/lib/connectDB";

export async function GET() {
  try {
    console.log("first");
    const users = await prisma.user.findMany();
    console.log("Fetching all users");
    return Response.json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    return Response.json({ error: "Error fetching users" });
  }
}


