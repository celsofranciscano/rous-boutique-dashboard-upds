import axios from "axios";
import Image from "next/image";

async function DetailPage({ params }) {
  // Obtener datos del usuario principal
  const responseUser = await axios.get(
    `${process.env.API_URL}/api/dashboard/users/${params.PK_user}`
  );
  const user = responseUser.data;

  // Obtener datos adicionales del usuario
  const responseDetails = await axios.get(
    `${process.env.API_URL}/api/dashboard/userdetails/${params.PK_user}`
  );
  const userDetails = responseDetails.data;

  // Formatear las fechas
  const createdAt = new Date(user.createdAt).toLocaleDateString("es-ES", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const dateOfBirth = new Date(userDetails?.dateOfBirth).toLocaleDateString(
    "es-ES",
    {
      year: "numeric",
      month: "long",
      day: "numeric",
    }
  );
  const hireDate = new Date(userDetails?.hireDate).toLocaleDateString("es-ES", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <section className="grid gap-4">
    

      {/* Sección de información del administrador */}
      <section className="p-4 border grid gap-4 dark:border-zinc-800 rounded-md">
        <h1 className="text-black dark:text-white font-normal text-lg pb-4 border-b dark:border-zinc-800">
          Información del Administrador
        </h1>
        <div className="flex items-center gap-4">
          {user?.profileImage ? (
            <Image
              className="rounded-full"
              src={user?.profileImage}
              width={80}
              height={80}
              alt="perfil"
            />
          ) : (
            <div className="w-20 h-20 rounded-full bg-zinc-200 dark:bg-zinc-950 flex items-center justify-center">
              <h1 className="text-4xl text-black dark:text-white">
                {user?.firstName?.charAt(0)?.toUpperCase() || ""}
              </h1>
            </div>
          )}
          <div>
            <h2 className="text-xl text-black dark:text-white font-medium">
              {user.firstName} {user.lastName}
            </h2>
            <p className="text text-zinc-500 dark:text-zinc-400">
              {user.email}
            </p>
            <p className="text-sm text-zinc-500 dark:text-zinc-500">
              Creado el {createdAt}
            </p>
          </div>
        </div>

        {/* Detalles adicionales */}
        <div className="mt-4">
          <h2 className="text-black dark:text-white font-medium text-lg">
            Detalles Adicionales
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2 dark:text-zinc-400 text-zinc-500">
            {/* CI */}
            <label className="flex flex-col gap-1">
              CI
              <input
                type="text"
                value={user.CI}
                disabled
                className="input-dark"
              />
            </label>

            {/* Número de Teléfono */}
            <label className="flex flex-col gap-1">
              Número de Teléfono
              <input
                type="text"
                value={userDetails?.phoneNumber}
                disabled
                className="input-dark"
              />
            </label>

            {/* Dirección */}
            <label className="flex flex-col gap-1">
              Dirección
              <input
                type="text"
                value={userDetails?.address}
                disabled
                className="input-dark"
              />
            </label>

            {/* Fecha de Nacimiento */}
            <label className="flex flex-col gap-1">
              Fecha de Nacimiento
              <input
                type="text"
                value={dateOfBirth}
                disabled
                className="input-dark"
              />
            </label>

            {/* Fecha de Contratación */}
            <label className="flex flex-col gap-1">
              Fecha de Contratación
              <input
                type="text"
                value={hireDate}
                disabled
                className="input-dark"
              />
            </label>

            {/* Cargo */}
            <label className="flex flex-col gap-1">
              Cargo
              <input
                type="text"
                value={userDetails?.position}
                disabled
                className="input-dark"
              />
            </label>

            {/* Salario */}
            <label className="flex flex-col gap-1">
              Salario
              <input
                type="text"
                value={`Bs ${userDetails?.salary}`}
                disabled
                className="input-dark"
              />
            </label>

            {/* Estado */}
            <label className="flex flex-col gap-1">
              Estado
              <input
                type="text"
                value={userDetails?.status ? "Activo" : "Inactivo"}
                disabled
                className="input-dark"
              />
            </label>
          </div>
        </div>
      </section>
    </section>
  );
}

export default DetailPage;
