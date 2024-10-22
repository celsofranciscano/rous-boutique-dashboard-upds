import Table from "@/components/dashboard/table/Table";
function CustomersPage() {
  const columns = [
    "ID",
    "Nombre",
    "Apellido",
    "CI",
    "email",
    "Estado",
    "Acciones",
  ];

  const rows = [
    "PK_customer",
    "firstName",
    "lastName",
    "CI",
    "email",
    "status",
  ];

  return (
    <section className="grid gap-4">
      <div className="py-4 p-2 ">
        <h1 className="text-2xl text-zinc-200 font-medium">Clientes</h1>
      </div>

      <Table
        url={"customers"}
        columns={columns}
        rows={rows}
        name={"cliente"}
      />
    </section>
  );
}

export default CustomersPage;
