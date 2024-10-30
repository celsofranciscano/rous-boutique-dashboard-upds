"use client";
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import axios from "axios";
import ButtonSubmit from "@/components/dashboard/common/ButtonSubmit";
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
  const [buttonsVisibility, setButtonsVisibility] = useState({
    showCheckIn: false,
    showCheckOut: false,
  });

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
      validateCheckInOut(response.data);
    } catch (error) {
      console.error("Error fetching attendance records:", error);
    }
  };

  // Función para validar check-in y check-out
  const validateCheckInOut = (records) => {
    const today = new Date().toISOString().split("T")[0];

    const todaysRecords = records.filter((record) => {
      const recordDate = record.day.split("T")[0];
      return recordDate === today;
    });

    const hasCheckedIn = todaysRecords.some((record) => record.checkIn !== null);
    const hasCheckedOut = todaysRecords.some((record) => record.checkOut !== null);

    setButtonsVisibility({
      showCheckIn: !hasCheckedIn,
      showCheckOut: hasCheckedIn && !hasCheckedOut,
    });
  };

  // Manejar la lógica de check-in o check-out
  const handleAttendance = async (action) => {
    setIsLoading(true);
    setSuccessMessage("");
    setErrorMessage("");

    const data = {
      email: session.user.email,
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
      <div className="py-4 p-2">
        <h1 className="text-2xl text-black dark:text-white font-medium">
          Asistencia {new Date().toLocaleDateString("es-ES", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}
        </h1>
      </div>

      <section className="p-4 border grid gap-4 dark:border-zinc-800 rounded-md">
        <h1 className="text-black dark:text-white font-normal text-lg pb-4 border-b dark:border-zinc-800">
          Hora de ingreso
        </h1>

        <div className="fixed bottom-4 md:bottom-8 right-4 md:right-8 z-50">
          {successMessage && (
            <AlertSuccess
              successMessage={successMessage}
              onClose={() => setSuccessMessage("")}
            />
          )}
          {errorMessage && (
            <AlertDanger
              errorMessage={errorMessage}
              onClose={() => setErrorMessage("")}
            />
          )}
        </div>

        <form
          onSubmit={handleSubmit(() => {})} // Aquí no se envía el formulario
          className="grid grid-cols-1 gap-2 dark:text-zinc-400 text-zinc-500"
        >
          {/* Campo oculto para el email del usuario */}
          <input
            type="hidden"
            {...register("email", {
              required: {
                value: true,
                message: "El email es obligatorio",
              },
            })}
          />
          {errors.email && (
            <span className="text-sm text-red-500">
              {errors.email.message}
            </span>
          )}

          <section className="md:col-span-3 flex flex-col md:flex-row mt-4 items-center justify-between border-t border-zinc-800 pt-4 gap-4">
            <p className="dark:text-zinc-400 text-zinc-500">
              Revisa la información antes de continuar.
            </p>
            {buttonsVisibility.showCheckIn && (
              <ButtonSubmit isLoading={isLoading} onClick={() => handleAttendance("checkIn")}>
                Check In
              </ButtonSubmit>
            )}
            {buttonsVisibility.showCheckOut && (
              <ButtonSubmit isLoading={isLoading} onClick={() => handleAttendance("checkOut")}>
                Check Out
              </ButtonSubmit>
            )}
          </section>
        </form>
      </section>
    </section>
  );
}

export default CreateAssists;
