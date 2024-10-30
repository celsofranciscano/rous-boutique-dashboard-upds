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
  const { barcode } = await request.json();
  const { PK_sale } = params;

  try {
    // 1. Buscar el producto por el código de barras
    const product = await prisma.tbproducts.findUnique({
      where: { barcode },
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
        FK_sale: parseInt(PK_sale),
        FK_product: product.PK_product,
      },
    });

    // 4. Actualizar el campo totalAmount de la venta sumando el precio del producto
    const productPrice = product.offerPrice ?? product.regularPrice;
    if (productPrice === undefined) {
      throw new Error("Precio del producto no disponible.");
    }

    await prisma.tbsales.update({
      where: { PK_sale: parseInt(PK_sale) },
      data: {
        totalAmount: {
          increment: productPrice,
        },
      },
    });

    // 5. Actualizar el campo isExisting del producto a false
    await prisma.tbproducts.update({
      where: { PK_product: product.PK_product },
      data: { isExisting: false },
    });

    // 6. Registrar o actualizar el ingreso en la tabla tbincome
    const existingIncome = await prisma.tbincome.findFirst({
      where: { FK_sale: parseInt(PK_sale) },
    });

    if (existingIncome) {
      // Actualizar el ingreso existente
      await prisma.tbincome.update({
        where: { PK_income: existingIncome.PK_income },
        data: {
          date: new Date(),
          products: { push: product.PK_product.toString() },
          description: `Ingreso generado a partir de la venta #${PK_sale}`,
          total: {
            increment: productPrice,
          },
        },
      });
    } else {
      // Crear un nuevo ingreso
      await prisma.tbincome.create({
        data: {
          FK_sale: parseInt(PK_sale),
          date: new Date(),
          products: [product.PK_product.toString()],
          description: `Ingreso generado a partir de la venta #${PK_sale}`,
          total: productPrice,
          status: true,
          createdAt: new Date(),
        },
      });
    }

    // 7. Retornar la respuesta con el detalle de la venta registrado
    return NextResponse.json(saleDetail);
  } catch (error) {
    console.error("Error in POST:", error.message);
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
