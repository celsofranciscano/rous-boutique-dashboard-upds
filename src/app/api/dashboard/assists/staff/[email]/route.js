// GET: Obtener todas las asistencias
import { NextResponse } from "next/server";
import prisma from "@/libs/db"; // Asegúrate de importar prisma

export async function GET(request, { params }) {
  try {
    // Obtener el usuario por su email
    const user = await prisma.tbusers.findUnique({
      where: {
        email: params.email,
      },
    });

    // Si no se encuentra el usuario, retornar un error
    if (!user) {
      return NextResponse.json(
        { message: "Usuario no encontrado" },
        { status: 404 }
      );
    }

    // Obtener todas las asistencias del usuario
    const assists = await prisma.tbassists.findMany({
      where: {
        FK_user: user.PK_user, // Asegúrate de que FK_assit corresponde al PK_user
      },
    });

    return NextResponse.json(assists); // Retornar las asistencias
  } catch (error) {
    console.error("Error al obtener las asistencias:", error);
    return NextResponse.json(
      { message: "Error interno del servidor" },
      { status: 500 }
    );
  }
}
