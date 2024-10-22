import Table from "@/components/dashboard/table/Table";
function SalesPage() {
  const columns = ["ID", "Estado venta", "Descripcion", "Estado", "Acciones"];

  const rows = [
    "PK_salestatus",
    "name",
    "description",
    "status",
  ];
  return (
    <section className="grid gap-4">
      <div className="py-4 p-2 ">
        <h1 className="text-2xl text-zinc-200 font-medium">Estado venta</h1>
      </div>

      <Table
        url={"salesstatuses"}
        columns={columns}
        rows={rows}
        name={"estado venta"}
      />
    </section>
  );
}

export default SalesPage;
