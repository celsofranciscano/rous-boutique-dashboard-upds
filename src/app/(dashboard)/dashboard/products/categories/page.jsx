import Table from "@/components/dashboard/table/Table";
function CategoriesPage() {
  const columns = [
    "ID",
    "Categoria",
    "SLUG",
    "descripcion",
    "Estado",
    "Acciones",
  ];

  const rows = ["PK_category", "name","urlCategory", "description", "status"];

  return (
    <section className="grid gap-4">
      <div className="py-4 p-2 ">
        <h1 className="text-2xl text-zinc-200 font-medium">Categorias</h1>
      </div>

      <Table url={"categories"} columns={columns} rows={rows} name={"categoria"} />
    </section>
  );
}

export default CategoriesPage;
