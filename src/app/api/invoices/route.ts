import { invoices } from "@prisma/client";
import prisma from "@/lib/connectDB";
import { NextRequest, NextResponse } from "next/server";
import { LuGalleryHorizontal } from "react-icons/lu";

export async function GET(req: NextRequest) {
  console.log("api hitted");
  const res = await prisma.$transaction([prisma.user.findMany({})]);
  return Response.json(res);
}

export async function POST(req: NextRequest) {
  // Parsing data from the request body
  const {
    invoiceDate,
    subtotal,
    discount,
    total,
    paymentMade,
    dueAmount,
    status,
    customerId,
    invoice_item,
  } = await req.json();

  // Step-1: Validate that all required fields are present
  if (
    !invoiceDate ||
    subtotal === undefined ||
    discount === undefined ||
    total === undefined ||
    paymentMade === undefined ||
    dueAmount === undefined ||
    !status ||
    !customerId ||
    !invoice_item
  ) {
    return NextResponse.json(
      { message: "Missing required fields" },
      { status: 400 }
    );
  }

  try {
    // Step-2: Start a transaction
    const userInvoice = await prisma.$transaction(async (prisma) => {
      // Create the invoice
      const createdInvoice = await prisma.invoices.create({
        data: {
          invoiceDate,
          subtotal,
          discount,
          total,
          paymentMade,
          dueAmount,
          status,
          customerId,
        },
      });

      const invoice_items_data = invoice_item.map((item) => ({
        invoice_id: createdInvoice.id,
        product_name: item.product_name,
        product_quantity: item.product_quantity,
        product_price: item.product_price,
      }));

      // Create invoice items in bulk
      await prisma.invoice_item.createMany({
        data: invoice_items_data,
      });

      console.log(invoice_items_data);

      await Promise.all(invoice_items_data);

      // Return the created invoice including invoice items
      return createdInvoice;
    });

    // Log the result after the transaction is complete
    console.log(userInvoice);

    // Return a success response with the created invoice data
    return NextResponse.json(
      { message: "Invoice created successfully", invoice: userInvoice },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating invoice:", error);

    // Return a failure response if any error occurs
    return NextResponse.json(
      { message: "Error creating invoice", error: error },
      { status: 500 }
    );
  }
}
