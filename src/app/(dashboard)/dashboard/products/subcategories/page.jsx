import Table from "@/components/dashboard/table/Table";
function SubCategoriesPage() {
  const columns = [
    "ID",
    "Subcategoria",
    "SLUG",
    "descripcion",
    "Estado",
    "Acciones",
  ];

  const rows = ["PK_subcategory", "name","urlSubcategory", "description", "status"];

  return (
    <section className="grid gap-4">
      <div className="py-4 p-2 ">
        <h1 className="text-2xl text-zinc-200 font-medium">Subcategorias</h1>
      </div>

      <Table url={"subcategories"} columns={columns} rows={rows} name={"Subcategoria"} />
    </section>
  );
}

export default SubCategoriesPage;
