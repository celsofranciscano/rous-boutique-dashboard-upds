import Table from "@/components/dashboard/table/Table";
function SizesPage() {
  const columns = ["ID", "Talla", "Estado", "Acciones"];

  const rows = ["PK_size", "name", "status"];

  return (
    <section className="grid gap-4">
      <div className="py-4 p-2 ">
        <h1 className="text-2xl text-zinc-200 font-medium">Tallas</h1>
      </div>

      <Table url={"sizes"} columns={columns} rows={rows} name={"tallas"} />
    </section>
  );
}

export default SizesPage;
