"use client";
import GenerateBarcode from "@/components/dashboard/table/GenerateBarcode";
import axios from "axios";

async function DetailProduct({ params }) {
  const responseProduct = await axios.get(
    `${process.env.API_URL}/api/dashboard/products/${params.PK_product}`
  );
  const product = responseProduct.data;

  const createdAt = new Date(product.createdAt).toLocaleDateString("es-ES", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <section className="grid gap-4 pb-8">
      <div className="py-4 p-2">
        <h1 className="text-2xl text-black dark:text-white font-medium">
          Productos
        </h1>
      </div>

      <section className="p-4 border grid gap-4 dark:border-zinc-800 rounded-md">
        <h1 className="text-black dark:text-white font-normal text-lg pb-4 border-b dark:border-zinc-800">
          Información del producto
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-2 dark:text-zinc-400 text-zinc-500">
          {/* Nombre del Producto */}
          <label className="flex flex-col gap-1">
            Nombre del Producto
            <input
              type="text"
              className="input-dark"
              value={product.name || ""}
              disabled
            />
          </label>

          {/* URL del Producto */}
          <label className="flex flex-col gap-1">
            URL del Producto
            <input
              type="text"
              className="input-dark"
              value={product.urlProduct || ""}
              disabled
            />
          </label>

          {/* Precio Regular */}
          <label className="flex flex-col gap-1">
            Precio Regular
            <input
              type="number"
              className="input-dark"
              value={product.regularPrice || ""}
              disabled
            />
          </label>

          {/* Precio en Oferta */}
          <label className="flex flex-col gap-1">
            Precio en Oferta
            <input
              type="number"
              className="input-dark"
              value={product.offerPrice || ""}
              disabled
            />
          </label>

          {/* Tamaño */}
          <label className="flex flex-col gap-1">
            Tamaño
            <select className="input-dark" value={product.FK_size || ""} disabled>
              <option>{product.FK_size}</option>
            </select>
          </label>

          {/* Subcategoría */}
          <label className="flex flex-col gap-1">
            Subcategoría
            <select className="input-dark" value={product.FK_subcategory || ""} disabled>
              <option>{product.FK_subcategory}</option>
            </select>
          </label>

          {/* Descripción */}
          <label className="flex flex-col gap-1">
            Descripción
            <textarea
              className="input-dark"
              value={product.description || ""}
              disabled
            />
          </label>

          {/* Fecha de creación */}
          <label className="flex flex-col gap-1">
            Fecha de creación
            <input
              type="text"
              className="input-dark"
              value={createdAt}
              disabled
            />
          </label>

          {/* Estado */}
          <label className="flex flex-col gap-1">
            Estado
            <input
              type="text"
              className="input-dark"
              value={product.status ? "Activo" : "Inactivo"}
              disabled
            />
          </label>
        </div>
      </section>

      {/* Separate section for barcode generation */}
      <section className="p-4 border dark:border-zinc-800 rounded-md">
        <h2 className="text-black dark:text-white font-normal text-lg pb-4 border-b dark:border-zinc-800">
          Generar Código de Barras
        </h2>
        <GenerateBarcode barcode={product.barcode} />
      </section>
    </section>
  );
}

export default DetailProduct;
