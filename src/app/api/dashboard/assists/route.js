import { NextResponse } from "next/server";
import prisma from "@/libs/db";


export async function GET() {
  try {
    // Obtener todas las asistencias y ordenarlas por PK_attendance de forma descendente
    const assists = await prisma.tbassists.findMany({
      orderBy: {
        PK_attendance: 'desc',
      },
      include: {
        tbusers: true, // Incluye los datos del usuario si es necesario
      },
    });

    return NextResponse.json(assists);
  } catch (error) {
    console.error("Error al obtener las asistencias:", error);
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



export async function POST(request) {
  try {
    const { email } = await request.json();

    // Obtener el usuario por email
    const user = await prisma.tbusers.findUnique({
      where: { email },
    });

    if (!user) {
      return NextResponse.json({ message: "Usuario no encontrado" }, { status: 404 });
    }

    // Registrar check-in
    const checkInRecord = await prisma.tbassists.create({
      data: {
        FK_user: user.PK_user,
        day: new Date(),
        checkIn: new Date(),
      },
    });

    return NextResponse.json(checkInRecord);
  } catch (error) {
    console.error("Error al registrar check-in:", error);
    return NextResponse.json({ message: "Error interno del servidor" }, { status: 500 });
  }
}
