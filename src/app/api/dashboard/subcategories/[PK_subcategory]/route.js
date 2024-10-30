import { NextResponse } from "next/server";
import prisma from "@/libs/db";

export async function GET(request,{params}) {
  try {
    const subcategories = await prisma.tbsubcategories.findUnique({
        where:{
            PK_subcategory: Number(params.PK_subcategory)
        }
    });
    return NextResponse.json(subcategories);
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