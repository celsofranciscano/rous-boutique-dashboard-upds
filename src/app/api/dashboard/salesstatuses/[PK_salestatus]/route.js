import { NextResponse } from "next/server";
import prisma from "@/libs/db";

export async function GET(request,{params}) {
  try {
    const salesstatus = await prisma.tbsalesstatuses.findUnique({
        where:{
            PK_salestatus:Number(params.PK_salestatus)

        }
    });
    return NextResponse.json(salesstatus);
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
