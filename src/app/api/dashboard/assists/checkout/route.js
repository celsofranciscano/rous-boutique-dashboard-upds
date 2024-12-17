import { NextResponse } from "next/server";
import prisma from "@/libs/db";





export async function PATCH(request) {
  try {
    const { email } = await request.json();

    // Obtener el usuario por email
    const user = await prisma.tbusers.findUnique({
      where: { email },
    });

    if (!user) {
      return NextResponse.json({ message: "Usuario no encontrado" }, { status: 404 });
    }

    // Buscar el registro de check-in de hoy del usuario
    const today = new Date().toISOString().split("T")[0];
    const assist = await prisma.tbassists.findFirst({
      where: {
        FK_user: user.PK_user,
        day: {
          gte: new Date(`${today}T00:00:00.000Z`),
          lt: new Date(`${today}T23:59:59.999Z`),
        },
        checkIn: { not: null },
        checkOut: null,
      },
    });

    if (!assist) {
      return NextResponse.json(
        { message: "No se encontró un registro de check-in para hoy" },
        { status: 404 }
      );
    }

    // Registrar check-out
    const updatedAssist = await prisma.tbassists.update({
      where: { PK_attendance: assist.PK_attendance },
      data: { checkOut: new Date() },
    });

    return NextResponse.json(updatedAssist);
  } catch (error) {
    console.error("Error al registrar check-out:", error);
    return NextResponse.json({ message: "Error interno del servidor" }, { status: 500 });
  }
}
