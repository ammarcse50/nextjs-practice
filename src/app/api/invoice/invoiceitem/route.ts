import prisma from "@/lib/connectDB";

export async function POST() {
  const invoice_Item = prisma.invoice_item.create({});
  Response.json(invoice_Item);
}
