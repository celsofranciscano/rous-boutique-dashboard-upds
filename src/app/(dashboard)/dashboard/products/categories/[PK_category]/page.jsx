import axios from "axios";

async function DetailPage({ params }) {
  const responseCategory = await axios.get(
    `${process.env.API_URL}/api/dashboard/categories/${params.PK_category}`
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
          Categorías
        </h1>
      </div>

      <section className="p-4 border grid gap-4 dark:border-zinc-800 rounded-md">
        <h1 className="text-black dark:text-white font-normal text-lg pb-4 border-b dark:border-zinc-800">
          Información de la categoría
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-2 dark:text-zinc-400 text-zinc-500">
          {/* Nombre de la categoría */}
          <label className="flex flex-col gap-1">
            Nombre de la categoría
            <input
              type="text"
              className="input-dark"
              value={category.name || ""}
              disabled
            />
          </label>

          {/* URL de la categoría */}
          <label className="flex flex-col gap-1">
            SLUG
            <input
              type="text"
              className="input-dark"
              value={category.urlCategory || ""}
              disabled
            />
          </label>

          {/* Descripción */}
          <label className="flex flex-col gap-1">
            Descripción
            <textarea
              className="input-dark"
              value={category.description || ""}
              disabled
            />
          </label>

          {/* Fecha de creación */}
          <label className="flex flex-col gap-1">
            Creado el
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
              value={category.status ? "Activo" : "Inactivo"}
              disabled
            />
          </label>
        </div>
      </section>
    </section>
  );
}

export default DetailPage;
