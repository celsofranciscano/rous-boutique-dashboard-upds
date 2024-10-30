import { NextResponse } from "next/server";
import prisma from "@/libs/db";

export async function GET(request, { params }) {
  try {
    const product = await prisma.tbproducts.findUnique({
      where: {
        PK_product: Number(params.PK_product),
      },
    });
    return NextResponse.json(product);
  } catch (error) {
    return NextResponse.json(
      {
        error: error.message,
      },
      {
        status: 500,
      }
    );
  }
}
