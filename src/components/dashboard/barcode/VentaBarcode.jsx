"use client";
import { useForm } from "react-hook-form";
import { useState } from "react";
import AlertDanger from "../common/AlertDanger";
import AlertSuccess from "../common/AlertSuccess";
import ButtonSubmit from "../common/ButtonSubmit";
import axios from "axios";

function VentaBarcode({ params,setRevalidate,revalidate }) {
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm();
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  // Función para manejar la sumisión del formulario
  async function onSubmit(data) {
    try {
      setIsLoading(true);
      setErrorMessage(null);
      setSuccessMessage(null);

      // Llamar a la API para crear el detalle de la venta
      const response = await axios.post(
        `/api/dashboard/sales/${params.PK_sale}/saledetails`,
        { barcode: data.barcode } // Enviar solo el código de barras
      );

      // Verificar la respuesta de la API
      if (response.status === 200) {

        setSuccessMessage("Salida creada con éxito.");
        setRevalidate(!revalidate)
        
        // Limpiar los campos del formulario después de 2 segundos
        setTimeout(() => {
          setSuccessMessage(null);
          reset(); // Limpiar todos los campos del formulario
        }, 2000);
      }
    } catch (err) {
      const errorMessage = err.response?.data?.message || "Error al crear la salida.";
      setErrorMessage(errorMessage);

      // Limpiar los campos del formulario después de 2 segundos en caso de error
      setTimeout(() => {
        setErrorMessage(null);
        reset(); // Limpiar todos los campos del formulario
      }, 2000);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <section className="p-4 border grid gap-4 dark:border-zinc-800 rounded-md">
      <h1 className="text-black dark:text-white font-normal text-lg border-b dark:border-zinc-800">
        Agregar un producto a la venta por Barcode
      </h1>
      {successMessage && (
        <AlertSuccess
          successMessage={successMessage}
          onClose={() => setSuccessMessage(null)}
        />
      )}
      {errorMessage && (
        <AlertDanger
          errorMessage={errorMessage}
          onClose={() => setErrorMessage(null)}
        />
      )}

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-1 gap-2 dark:text-zinc-400 text-zinc-500"
      >
        <label className="flex flex-col gap-1">
          Código de barras *
          <input
            autoFocus
            type="text"
            className="input-dark"
            {...register("barcode", {
              required: "El código de barra es obligatorio",
              pattern: {
                value: /^\d+$/,
                message: "El código de barra debe contener solo números",
              },
              minLength: {
                value: 8,
                message: "El código de barra debe tener al menos 8 dígitos",
              },
              maxLength: {
                value: 13,
                message: "El código de barra no debe exceder 13 dígitos",
              },
            })}
          />
          {errors.barcode && (
            <span className="text-sm text-red-500">{errors.barcode.message}</span>
          )}
        </label>

        <section className="flex flex-col md:flex-row mt-4 items-center justify-between border-t border-zinc-800 pt-4 gap-4">
          <p className="dark:text-zinc-400 text-zinc-500">
            Escanea el código de barra del producto.
          </p>
          <ButtonSubmit isLoading={isLoading} />
        </section>
      </form>
    </section>
  );
}

export default VentaBarcode;
