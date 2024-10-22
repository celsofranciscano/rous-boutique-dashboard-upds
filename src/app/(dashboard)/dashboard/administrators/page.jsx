import Table from "@/components/dashboard/table/Table";
function AdministratorsPage() {
  const columns = [
    "ID",
    "Rol",
    "Nombre",
    "Apellido",
    "Email",
    "Estado",
    "Acciones",
  ];

  const rows = [
    "PK_user",
    "FK_role",
    "firstName",
    "lastName",
    "email",
    "status",
  ];

  return (
    <section className="grid gap-4">
      <div className="py-4 p-2 ">
        <h1 className="text-2xl text-zinc-200 font-medium">Administradores</h1>
      </div>

      <Table url={"users"} columns={columns} rows={rows} name={"usuario"} />
    </section>
  );
}

export default AdministratorsPage;
