import prisma from "@/lib/connectDB";

export async function PUT(
  req:Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const { name, email, password } = await req.json();
    const updatedUser = await prisma.user.update({
      where: { id: Number(id) },
      data: { name, email, password },
    });
    return Response.json(updatedUser);
  } catch (error) {
    console.error("Error updating user:", error);
    return Response.json({ error: "Error updating user" });
  }
}
