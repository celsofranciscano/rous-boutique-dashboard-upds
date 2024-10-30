import axios from "axios";

async function DetailPage({ params }) {
  const responseSubcategory = await axios.get(
    `${process.env.API_URL}/api/dashboard/subcategories/${params.PK_subcategory}`
  );
  const subcategory = responseSubcategory.data;

  const createdAt = new Date(subcategory.createdAt).toLocaleDateString("es-ES", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <section className="grid gap-4 pb-8">
      <div className="py-4 p-2">
        <h1 className="text-2xl text-black dark:text-white font-medium">
          Subcategorías
        </h1>
      </div>

      <section className="p-4 border grid gap-4 dark:border-zinc-800 rounded-md">
        <h1 className="text-black dark:text-white font-normal text-lg pb-4 border-b dark:border-zinc-800">
          Información de la Subcategoría
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-2 dark:text-zinc-400 text-zinc-500">
          {/* Nombre de la subcategoría */}
          <label className="flex flex-col gap-1">
            Nombre de la subcategoría
            <input
              type="text"
              className="input-dark"
              value={subcategory.name || ""}
              disabled
            />
          </label>

          {/* URL de la subcategoría */}
          <label className="flex flex-col gap-1">
            SLUG
            <input
              type="text"
              className="input-dark"
              value={subcategory.urlSubcategory || ""}
              disabled
            />
          </label>

          {/* Descripción */}
          <label className="flex flex-col gap-1">
            Descripción
            <textarea
              className="input-dark"
              value={subcategory.description || ""}
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
              value={subcategory.status ? "Activo" : "Inactivo"}
              disabled
            />
          </label>
        </div>
      </section>
    </section>
  );
}

export default DetailPage;
