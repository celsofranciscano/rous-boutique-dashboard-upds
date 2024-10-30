import { NextResponse } from "next/server";
import prisma from "@/libs/db";

// POST: Crear una nueva asistencia
export async function POST(request) {
  try {
    const { email } = await request.json();

    // Busca el usuario por email para obtener su ID
    const user = await prisma.tbusers.findUnique({
      where: { email },
    });

    if (!user) {
      return NextResponse.json(
        { message: "Usuario no encontrado" },
        { status: 404 }
      );
    }

    // Crear el registro de asistencia
    const newAssist = await prisma.tbassists.create({
      data: {
        FK_user: user.PK_user,
        day: new Date(),
        checkIn: new Date(),
      },
    });

    return NextResponse.json(newAssist);
  } catch (error) {
    console.error("Error al crear la asistencia:", error);
    return NextResponse.json(
      { message: "Error interno del servidor" },
      { status: 500 }
    );
  }
}


