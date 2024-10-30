import { NextResponse } from "next/server";
import prisma from "@/libs/db";

export async function GET() {
  try {
    const customers = await prisma.tbcustomers.findMany({
      orderBy: {
        PK_customer: "desc", 
      },
    });
    return NextResponse.json(customers);
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




export async function POST(request) {
  try {
    // Parsear el cuerpo de la solicitud
    const { CI, firstName, lastName, email } = await request.json();

    // Validaciones de los campos requeridos
    if (!firstName || !lastName) {
      return NextResponse.json(
        { message: "Los campos 'nombre' y 'apellido' son obligatorios" },
        { status: 400 }
      );
    }

    // Validaciones opcionales
    if (CI && CI.length > 20) {
      return NextResponse.json(
        { message: "CI no puede exceder los 20 caracteres" },
        { status: 400 }
      );
    }

    if (email && !/^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/.test(email)) {
      return NextResponse.json(
        { message: "Formato de email no válido" },
        { status: 400 }
      );
    }

    // Verificar si el cliente ya existe basado en su CI o email
    const existingCustomer = await prisma.tbcustomers.findFirst({
      where: {
        OR: [
          { CI: CI ? CI : undefined },
          { email: email ? email : undefined }
        ]
      }
    });

    if (existingCustomer) {
      return NextResponse.json(
        { message: "El cliente ya está registrado con ese CI o email" },
        { status: 400 }
      );
    }

    // Crear el nuevo cliente
    const newCustomer = await prisma.tbcustomers.create({
      data: {
        CI,
        firstName,
        lastName,
        email
      }
    });

    // Retornar respuesta exitosa con el cliente creado
    return NextResponse.json(newCustomer);
  } catch (error) {
    console.log(error.message)
    return NextResponse.json(
      { message: "Error interno del servidor" },
      { status: 500 }
    );
  }
}
