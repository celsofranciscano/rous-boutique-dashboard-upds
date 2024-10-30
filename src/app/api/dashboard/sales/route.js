import { NextResponse } from "next/server";
import prisma from "@/libs/db";

export async function GET() {
  try {
    const sales = await prisma.tbsales.findMany({
      include: {
        tbcustomers: {
          select: {
            firstName: true,
            lastName: true,
            CI: true,
          },
        },
        tbsalesstatuses: {
          select: {
            name: true,
          },
        },
      },
    });

    // Mapea los resultados para formatear la respuesta en un solo nivel
    const salesDetails = sales.map((sale) => ({
      PK_sale: sale.PK_sale,
      totalAmount: sale.totalAmount,
      status: sale.status,
      createdAt: sale.createdAt,
      updatedAt: sale.updatedAt,
      customerName: `${sale.tbcustomers.firstName} ${sale.tbcustomers.lastName}`, // Nombre completo del cliente
      customerCI: sale.tbcustomers.CI, // CI del cliente
      salestatus: sale.tbsalesstatuses.name, // Nombre del estado de la venta
    }));

    return NextResponse.json(salesDetails);
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
  const { FK_customer, FK_salestatus } = await request.json(); // Desestructura los campos necesarios

  // Validaciones
  if (!FK_customer) {
    return NextResponse.json(
      { message: "El campo FK_customer es obligatorio." },
      { status: 400 }
    );
  }

  if (!FK_salestatus) {
    return NextResponse.json(
      { message: "El campo FK_salestatus es obligatorio." },
      { status: 400 }
    );
  }


  try {
    // Crear la venta en la base de datos
    const sale = await prisma.tbsales.create({
      data: {
        FK_customer: Number(FK_customer),
        FK_salestatus: Number (FK_salestatus),
        totalAmount: "0.00"
        // Puedes agregar otros campos necesarios aquí
      },
    });

    return NextResponse.json({ message: "Venta creada con éxito", sale });
  } catch (error) {
    console.error("Error al crear la venta:", error);
    
    // Manejo de errores específico
    if (error.code === 'P2002') { // Errores de unicidad de Prisma
      return NextResponse.json(
        { message: "La venta ya existe o hay un conflicto de datos." },
        { status: 409 }
      );
    }

    return NextResponse.json(
      { message: "Error al crear la venta", error: error.message },
      { status: 500 }
    );
  }
}
