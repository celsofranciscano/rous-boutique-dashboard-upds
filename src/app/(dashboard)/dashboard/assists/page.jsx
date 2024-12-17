"use client";
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import axios from "axios";
import AlertDanger from "@/components/dashboard/common/AlertDanger";
import AlertSuccess from "@/components/dashboard/common/AlertSuccess";
import { useSession } from "next-auth/react";

function CreateAssists() {
  const { data: session } = useSession();
  const {
    handleSubmit,
    register,
    setValue,
    formState: { errors },
  } = useForm();
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [attendanceRecords, setAttendanceRecords] = useState([]);

  // Usar useEffect para establecer el valor del email y obtener registros de asistencia
  useEffect(() => {
    if (session?.user?.email) {
      setValue("email", session.user.email);
      fetchAttendanceRecords(session.user.email);
    }
  }, [session, setValue]);

  // Función para obtener registros de asistencia del usuario
  const fetchAttendanceRecords = async (email) => {
    try {
      const response = await axios.get(`/api/dashboard/assists/staff/${email}`);
      setAttendanceRecords(response.data);
    } catch (error) {
      console.error("Error fetching attendance records:", error);
    }
  };

  // Manejar la lógica de check-in o check-out
  const handleAttendance = async (action) => {
    setIsLoading(true);
    setSuccessMessage("");
    setErrorMessage("");

    const data = {
      email: session?.user?.email,
      action, // "checkIn" o "checkOut"
    };

    try {
      if (action === "checkIn") {
        await axios.post("/api/dashboard/assists", data);
        setSuccessMessage("Hora de ingreso registrada correctamente");
      } else if (action === "checkOut") {
        await axios.patch("/api/dashboard/assists/checkout", data);
        setSuccessMessage("Hora de salida registrada correctamente");
      }
      fetchAttendanceRecords(session.user.email); // Refrescar registros
    } catch (err) {
      if (err.response && err.response.data) {
        setErrorMessage(err.response.data.message);
      } else {
        setErrorMessage("Error al registrar la asistencia");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="grid gap-4">
      {/* Cabecera */}
      <div className="py-4 p-2">
        <h1 className="text-2xl text-black dark:text-white font-medium">
          Asistencia{" "}
          {new Date().toLocaleDateString("es-ES", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </h1>
      </div>

      {/* Sección para Check In/Out */}
      <section className="p-4 border grid gap-4 dark:border-zinc-800 rounded-md">
        <h1 className="text-black dark:text-white font-normal text-lg pb-4 border-b dark:border-zinc-800">
          Hora de ingreso
        </h1>

        <form
          onSubmit={handleSubmit(() => {})}
          className="grid grid-cols-1 gap-2 dark:text-zinc-400 text-zinc-500"
        >
          <input type="hidden" {...register("email")} />
          
          {/* Botón de Check In */}
          <button
            type="button"
            className="bg-green-500 text-white p-2 rounded"
            onClick={() => handleAttendance("checkIn")}
            disabled={isLoading}
          >
            {isLoading ? "Cargando..." : "Check In"}
          </button>
          
          {/* Botón de Check Out */}
          <button
            type="button"
            className="bg-blue-500 text-white p-2 rounded"
            onClick={() => handleAttendance("checkOut")}
            disabled={isLoading}
          >
            {isLoading ? "Cargando..." : "Check Out"}
          </button>
        </form>

        {/* Mensajes de éxito o error */}
        {successMessage && <AlertSuccess message={successMessage} />}
        {errorMessage && <AlertDanger message={errorMessage} />}
      </section>

      {/* Tabla de registros de asistencia */}
      <section className="p-4 border dark:border-zinc-800 rounded-md">
        <h2 className="text-lg font-medium mb-4">Registros de Asistencia</h2>
        {attendanceRecords.length === 0 ? (
          <p className="text-zinc-500">No hay registros de asistencia.</p>
        ) : (
          <table className="w-full border dark:border-zinc-700">
            <thead>
              <tr className="border-b dark:border-zinc-700">
                <th className="px-4 py-2">Día</th>
                <th className="px-4 py-2">Hora de Entrada</th>
                <th className="px-4 py-2">Hora de Salida</th>
              </tr>
            </thead>
            <tbody>
              {attendanceRecords.map((record) => (
                <tr
                  key={record.PK_attendance}
                  className="border-b dark:border-zinc-700"
                >
                  <td className="px-4 py-2">
                    {new Date(record.day).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-2">
                    {record.checkIn
                      ? new Date(record.checkIn).toLocaleTimeString()
                      : "-"}
                  </td>
                  <td className="px-4 py-2">
                    {record.checkOut
                      ? new Date(record.checkOut).toLocaleTimeString()
                      : "-"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>
    </section>
  );
}

export default CreateAssists;
