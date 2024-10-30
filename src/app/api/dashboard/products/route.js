import { NextResponse } from "next/server";
import prisma from "@/libs/db";

export async function GET() {
  try {
    const products = await prisma.tbproducts.findMany();
    
    // Transformar los nombres de los campos antes de retornar
    const renamedProducts = products.map((product) => ({
      PK_product: product.PK_product,
      FK_subcategory: product.FK_subcategory,
      FK_size: product.FK_size,
      barcode: product.barcode,
      name: product.name,
      urlProduct: product.urlProduct,
      regularPrice: product.regularPrice,
      offerPrice: product.offerPrice,
      description: product.description,
      images: product.images,
      isExisting: product.isExisting ? "Tienda":"Vendido",
      status: product.status,
      createdAt: product.createdAt,
      updated: product.updated,
    }));

    return NextResponse.json(renamedProducts);
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
    const {
      name,
      urlProduct,
      regularPrice,
      offerPrice,
      description,
      FK_size,
      FK_subcategory,
      imageUrls,  // Array de URLs de imágenes
    } = await request.json();

    // Validaciones de los campos requeridos
    if (!name || !urlProduct || !regularPrice || !FK_size || !FK_subcategory) {
      return NextResponse.json(
        { message: "Todos los campos obligatorios deben ser proporcionados" },
        { status: 400 }
      );
    }

    if (urlProduct.length > 80) {
      return NextResponse.json(
        { message: "La URL del producto no puede exceder los 80 caracteres" },
        { status: 400 }
      );
    }

    // Generar código de barras
    async function generateBarcode() {
      const lastProduct = await prisma.tbproducts.findFirst({
        orderBy: { barcode: 'desc' },
        select: { barcode: true }
      });

      let barcode;
      if (lastProduct && lastProduct.barcode) {
        barcode = (BigInt(lastProduct.barcode) + 1n).toString().padStart(12, '0');
      } else {
        barcode = Math.floor(100000000000 + Math.random() * 900000000000).toString();
      }

      let existingBarcode = await prisma.tbproducts.findUnique({
        where: { barcode }
      });

      while (existingBarcode) {
        barcode = Math.floor(100000000000 + Math.random() * 900000000000).toString();
        existingBarcode = await prisma.tbproducts.findUnique({
          where: { barcode }
        });
      }

      return barcode;
    }

    const barcode = await generateBarcode();

    // Crear el nuevo producto
    const newProduct = await prisma.tbproducts.create({
      data: {
        name,
        barcode,
        urlProduct,
        regularPrice,
        offerPrice: offerPrice || null,
        description: description || null,
        FK_size: Number(FK_size),
        FK_subcategory: Number(FK_subcategory),
        images: imageUrls || []  // Guardar URLs de imágenes en el array
      }
    });

    return NextResponse.json(newProduct);
  } catch (error) {
    console.error("Error creando producto:", error);
    return NextResponse.json(
      { message: "Error interno del servidor" },
      { status: 500 }
    );
  }
}


