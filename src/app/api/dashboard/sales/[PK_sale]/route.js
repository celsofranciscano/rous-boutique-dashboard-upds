import { NextResponse } from "next/server";
import prisma from "@/libs/db";

export async function GET(request, { params }) {
  try {
    const sale = await prisma.tbsales.findUnique({
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
        tbsaledetails: {
          include: {
            tbproducts: {
              select: {
                name: true,
                barcode: true,
                regularPrice: true,
                offerPrice: true,
                description: true,
                images: true,
              },
            },
          },
        },
      },
      where: {
        PK_sale: Number(params.PK_sale),
      },
    });

    // Verifica si se encontró la venta
    if (!sale) {
      return NextResponse.json(
        { error: "Venta no encontrada" },
        { status: 404 }
      );
    }

    // Formatea la respuesta
    const saleDetails = {
      PK_sale: sale.PK_sale,
      totalAmount: sale.totalAmount,
      status: sale.status,
      createdAt: sale.createdAt,
      updatedAt: sale.updatedAt,
      customerName: `${sale.tbcustomers.firstName} ${sale.tbcustomers.lastName}`, // Nombre completo del cliente
      customerCI: sale.tbcustomers.CI, // CI del cliente
      salestatus: sale.tbsalesstatuses.name, // Nombre del estado de la venta
      saleDetails: sale.tbsaledetails.map(detail => ({
        PK_saledetail: detail.PK_saledetail,
        product: {
          name: detail.tbproducts.name,
          barcode: detail.tbproducts.barcode,
          regularPrice: detail.tbproducts.regularPrice,
          offerPrice: detail.tbproducts.offerPrice,
          description: detail.tbproducts.description,
          images: detail.tbproducts.images,
        },
        status: detail.status,
        createdAt: detail.createdAt,
        updatedAt: detail.updatedAt,
      })),
    };

    return NextResponse.json(saleDetails);
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
