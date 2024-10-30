import axios from "axios";

async function DetailPage({ params }) {
  const responseCategory = await axios.get(
    `${process.env.API_URL}/api/dashboard/salesstatuses/${params.PK_salestatus}`
  );
  const category = responseCategory.data;

  const createdAt = new Date(category.createdAt).toLocaleDateString("es-ES", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <section className="grid gap-4 pb-8">
      <div className="py-4 p-2">
        <h1 className="text-2xl text-black dark:text-white font-medium">
          Estado de venta
        </h1>
      </div>

      <section className="p-4 border grid gap-4 dark:border-zinc-800 rounded-md">
        <h1 className="text-black dark:text-white font-normal text-lg pb-4 border-b dark:border-zinc-800">
          Información del estado de venta
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-2 dark:text-zinc-400 text-zinc-500">
          {/* Nombre del estado de venta */}
          <label className="flex flex-col gap-1">
            Nombre del estado
            <p className="input-dark">{category.name || "Sin nombre"}</p>
          </label>

          {/* Descripción */}
          <label className="flex flex-col gap-1">
            Descripción
            <p className="input-dark">{category.description || "Sin descripción"}</p>
          </label>

          {/* Fecha de creación */}
          <label className="flex flex-col gap-1">
            Creado el
            <p className="input-dark">{createdAt}</p>
          </label>

          {/* Estado */}
          <label className="flex flex-col gap-1">
            Estado
            <p className="input-dark">{category.status ? "Activo" : "Inactivo"}</p>
          </label>
        </div>
      </section>
    </section>
  );
}

export default DetailPage;
