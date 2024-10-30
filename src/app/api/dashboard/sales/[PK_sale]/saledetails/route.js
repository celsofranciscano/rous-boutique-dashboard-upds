import { NextResponse } from "next/server";
import prisma from "@/libs/db";

export async function GET() {
  try {
    const saledetails = await prisma.tbsaledetails.findMany();
    return NextResponse.json(saledetails);
  } catch (error) {
    return NextResponse.json(
      {
        message: error.message,
      },
      {
        status: 500,
      }
    );
  }
}

export async function POST(request, { params }) {
  const { barcode } = await request.json(); // Obtener el código de barras del cuerpo de la solicitud
  const { PK_sale } = params; // Obtener el PK_sale de los parámetros

  try {
    // 1. Buscar el producto por el código de barras
    const product = await prisma.tbproducts.findUnique({
      where: { barcode: barcode },
    });

    // 2. Verificar que el producto exista y que isExisting sea true
    if (!product || !product.isExisting) {
      return NextResponse.json(
        {
            message: "Producto no encontrado o ya vendido.",
        },
        {
          status: 404,
        }
      );
    }

    // 3. Registrar en la tabla tbsaledetails
    const saleDetail = await prisma.tbsaledetails.create({
      data: {
        FK_sale: parseInt(PK_sale), // Asegurarse de que PK_sale sea un número
        FK_product: product.PK_product, // Usar PK_product del producto encontrado
      },
    });

    // 4. Actualizar el campo totalAmount de la venta sumando el precio del producto
    await prisma.tbsales.update({
      where: { PK_sale: parseInt(PK_sale) }, // Asegurarse de que PK_sale sea un número
      data: {
        totalAmount: {
          increment: product.offerPrice
            ? product.offerPrice
            : product.regularPrice, // Sumar el precio de oferta o regular
        },
      },
    });

    // 5. Actualizar el campo isExisting del producto a false
    await prisma.tbproducts.update({
      where: { PK_product: product.PK_product },
      data: { isExisting: false },
    });

    // 6. Retornar la respuesta con el detalle de la venta registrado
    return NextResponse.json(saleDetail);
  } catch (error) {
    console.log(error.message);
    return NextResponse.json(
      {
        message: error.message,
      },
      {
        status: 500,
      }
    );
  }
}
