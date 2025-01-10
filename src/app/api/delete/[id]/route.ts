import prisma from "@/lib/connectDB";

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const deletedUser = await prisma.user.delete({
      where: { id: Number(id) },
    });
    return Response.json(deletedUser);
  } catch (error) {
    console.error("Error deleting user:", error);
    return Response.json({ error: "Error deleting user" });
  }
}
