"use client";
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import axios from "axios";
import ButtonSubmit from "@/components/dashboard/common/ButtonSubmit";
import AlertDanger from "@/components/dashboard/common/AlertDanger";
import AlertSuccess from "@/components/dashboard/common/AlertSuccess";

function CreateSale() {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [customers, setCustomers] = useState([]);
  const [saleStatuses, setSaleStatuses] = useState([]);

  useEffect(() => {
    async function getCustomers() {
      try {
        const response = await axios.get("/api/dashboard/customers");
        console.log("Customers fetched:", response.data);
        setCustomers(response.data);
      } catch (err) {
        setErrorMessage("Error al cargar los clientes");
      }
    }

    async function getSaleStatuses() {
      try {
        const response = await axios.get("/api/dashboard/salesstatuses");
        console.log("Sales statuses fetched:", response.data);
        setSaleStatuses(response.data);
      } catch (err) {
        setErrorMessage("Error al cargar los estados de venta");
      }
    }

    getCustomers();
    getSaleStatuses();
  }, []);

  async function onSubmit(data) {
    setIsLoading(true);
    setSuccessMessage("");
    setErrorMessage("");

    try {
      const result = await axios.post("/api/dashboard/sales", data);
      setSuccessMessage("Venta creada exitosamente");
    } catch (err) {
      if (err.response && err.response.data) {
        setErrorMessage(err.response.data.message);
      } else {
        setErrorMessage("Error al crear la venta");
      }
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <section className="grid gap-4 pb-8">
      <div className="py-4 p-2">
        <h1 className="text-2xl text-black dark:text-white font-medium">
          Crear Venta
        </h1>
      </div>

      <section className="p-4 border grid gap-4 dark:border-zinc-800 rounded-md">
        <h1 className="text-black dark:text-white font-normal text-lg pb-4 border-b dark:border-zinc-800">
          Información de la Venta
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
          onSubmit={handleSubmit(onSubmit)}
          className="grid grid-cols-1 md:grid-cols-2 gap-2 dark:text-zinc-400 text-zinc-500"
        >
          {/* Selección del Cliente */}
          <label className="flex flex-col gap-1">
            Cliente *
            <select
              className="input-dark"
              {...register("FK_customer", {
                required: "El campo cliente es obligatorio",
              })}
            >
              <option value="">Selecciona un cliente</option>
              {customers.map((customer) => (
                <option key={customer.PK_customer} value={customer.PK_customer}>
                  {customer.firstName} {customer.lastName}
                </option>
              ))}
            </select>
            {errors.FK_customer && (
              <span className="text-sm text-red-500">
                {errors.FK_customer.message}
              </span>
            )}
          </label>

          {/* Selección del Estado de Venta */}
          <label className="flex flex-col gap-1">
            Estado de Venta *
            <select
              className="input-dark"
              {...register("FK_salestatus", {
                required: "El campo estado de venta es obligatorio",
              })}
            >
              <option value="">Selecciona un estado de venta</option>
              {saleStatuses.map((status) => (
                <option key={status.PK_salestatus} value={status.PK_salestatus}>
                  {status.name}
                </option>
              ))}
            </select>
            {errors.FK_salestatus && (
              <span className="text-sm text-red-500">
                {errors.FK_salestatus.message}
              </span>
            )}
          </label>

          {/* Sección para el Botón de Envío */}
          <section className="flex flex-col col-span-4 md:flex-row mt-4 items-center justify-between border-t border-zinc-800 pt-4 gap-4">
            <p className="dark:text-zinc-400 text-zinc-500">
              Revisa la información antes de continuar.
            </p>
            <ButtonSubmit isLoading={isLoading} />
          </section>
        </form>
      </section>
    </section>
  );
}

export default CreateSale;
