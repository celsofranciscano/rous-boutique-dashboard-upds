import Table from "@/components/dashboard/table/Table";

function RolesPage() {
  const columns = ["ID", "Rol", "Estado", "Acciones"];

  const rows = ["PK_role", "role", "status"];

  return (
    <section className="grid gap-4">
      <div className="py-4 p-2 ">
        <h1 className="text-2xl text-zinc-200 font-medium">Roles</h1>
      </div>

      <Table
        url={"roles"}
        columns={columns}
        rows={rows}
        name={"rol"}
      />
    </section>
  );
}

export default RolesPage;
