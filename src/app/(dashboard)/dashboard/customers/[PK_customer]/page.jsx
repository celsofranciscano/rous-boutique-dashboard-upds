import axios from "axios";
import Image from "next/image";

async function DetailPage({ params }) {
  const responseCustomer = await axios.get(
    `${process.env.API_URL}/api/dashboard/customers/${params.PK_customer}`
  );
  const customer = responseCustomer.data;

  const createdAt = new Date(customer.createdAt).toLocaleDateString("es-ES", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <section className="grid gap-4">
      <div className="py-4 p-2">
        <h1 className="text-2xl text-black dark:text-white font-medium">
          Cliente
        </h1>
      </div>
      {/* Sección de información del cliente */}
      <section className="p-4 border grid gap-4 dark:border-zinc-800 rounded-md">
        <h1 className="text-black dark:text-white font-normal text-lg pb-4 border-b dark:border-zinc-800">
          Información del cliente
        </h1>
        <div className="flex items-center gap-4">
          {customer?.profileImage ? (
            <Image
              className="rounded-full"
              src={customer?.profileImage}
              width={80}
              height={80}
              alt="Perfil"
            />
          ) : (
            <div className="w-20 h-20 rounded-full bg-zinc-200 dark:bg-zinc-950 flex items-center justify-center">
              <h1 className="text-4xl text-black dark:text-white">
                {customer?.firstName?.charAt(0)?.toUpperCase() || ""}
              </h1>
            </div>
          )}
          <div>
            <h2 className="text-xl text-black dark:text-white font-medium">
              {customer.firstName} {customer.lastName}
            </h2>
            <p className="text text-zinc-500 dark:text-zinc-400">
              {customer.email || "Sin correo"}
            </p>
            <p className="text text-zinc-500 dark:text-zinc-500">
              CI: {customer.CI || "Sin CI"}
            </p>
            <p className="text-sm text-zinc-500 dark:text-zinc-500">
              Creado el {createdAt}
            </p>
            <p className="text-sm text-zinc-500 dark:text-zinc-500">
              Estado: {customer.status ? "Activo" : "Inactivo"}
            </p>
          </div>
        </div>
      </section>
    </section>
  );
}

export default DetailPage;
