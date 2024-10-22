import Table from "@/components/dashboard/table/Table";
function SalesPage() {
  const columns = ["ID", "Total", "Nombre", "CI", "Estado Venta", "Acciones"];

  const rows = [
    "PK_sale",
    "totalAmount",
    "customerName",
    "customerCI",
    "salestatus",
  ];
  return (
    <section className="grid gap-4">
      <div className="py-4 p-2 ">
        <h1 className="text-2xl text-zinc-200 font-medium">Ventas</h1>
      </div>

      <Table
        url={"sales"}
        columns={columns}
        rows={rows}
        name={"venta"}
      />
    </section>
  );
}

export default SalesPage;
