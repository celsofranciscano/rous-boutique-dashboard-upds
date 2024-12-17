import { NextResponse } from "next/server";
import prisma from "@/libs/db";

export async function GET(request, { params }) {
  try {
    const user = await prisma.tbusers.findUnique({
      where: { email: params.email },
    });

    if (!user) {
      return NextResponse.json({ message: "Usuario no encontrado" }, { status: 404 });
    }

    const assists = await prisma.tbassists.findMany({
      where: { FK_user: user.PK_user },
      orderBy: { day: "desc" },
    });

    return NextResponse.json(assists);
  } catch (error) {
    console.error("Error al obtener las asistencias:", error);
    return NextResponse.json({ message: "Error interno del servidor" }, { status: 500 });
  }
}
