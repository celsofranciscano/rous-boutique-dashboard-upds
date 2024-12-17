"use client";
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import axios from "axios";
import ButtonSubmit from "@/components/dashboard/common/ButtonSubmit";

function CreateUser() {
  const {
    handleSubmit,
    register,
    getValues,
    formState: { errors },
  } = useForm();
  const [roles, setRoles] = useState([]);
  const [isLoading, setIsLoading] = useState(false); // Estado de loading

  useEffect(() => {
    async function getRoles() {
      const roles = await axios.get("/api/dashboard/roles");
      setRoles(roles.data);
    }

    getRoles();
  }, []);

  async function onSubmit(data) {
    setIsLoading(true); // Activa el estado de loading
    try {
      const result = await axios.post("/api/dashboard/users", data);
      console.log("Usuario creado:", result);
    } catch (err) {
      console.error("Error al crear el usuario:", err);
    } finally {
      setIsLoading(false); // Desactiva el estado de loading
    }
  }

  return (
    <section className="grid gap-4">
      <div className="py-4 p-2">
        <h1 className="text-2xl text-black dark:text-white font-medium">
          Administradores
        </h1>
      </div>

      <section className="p-4 border grid gap-4 dark:border-zinc-800 rounded-md">
        <h1 className="text-black dark:text-white font-normal text-lg pb-4 border-b dark:border-zinc-800">
          Crear un nuevo usuario
        </h1>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid grid-cols-1 md:grid-cols-3 gap-2 dark:text-zinc-400 text-zinc-500"
        >
          {/* Nombre */}
          <label className="flex flex-col gap-1">
            Nombre
            <input
              type="text"
              className="input-dark"
              {...register("firstName", {
                required: {
                  value: true,
                  message: "Nombre requerido",
                },
                pattern: {
                  value: /^[A-Za-z\s]+$/,
                  message: "El nombre solo puede contener letras",
                },
                maxLength: {
                  value: 20,
                  message: "El nombre no puede tener más de 20 caracteres",
                },
              })}
            />
            {errors.firstName && (
              <span className="text-sm text-red-500">
                {errors.firstName.message}
              </span>
            )}
          </label>

          {/* Apellido */}
          <label className="flex flex-col gap-1">
            Apellido
            <input
              type="text"
              className="input-dark"
              {...register("lastName", {
                required: {
                  value: true,
                  message: "Apellido requerido",
                },
                pattern: {
                  value: /^[A-Za-z\s]+$/,
                  message: "El apellido solo puede contener letras",
                },
                maxLength: {
                  value: 20,
                  message: "El apellido no puede tener más de 20 caracteres",
                },
              })}
            />
            {errors.lastName && (
              <span className="text-sm text-red-500">
                {errors.lastName.message}
              </span>
            )}
          </label>

          {/* CI */}
          <label className="flex flex-col gap-1">
            CI
            <input
              type="text"
              className="input-dark"
              {...register("CI", {
                required: {
                  value: true,
                  message: "CI requerido",
                },
                pattern: {
                  value: /^[0-9]+$/,
                  message: "El CI solo puede contener números (sin símbolos)",
                },
                maxLength: {
                  value: 12,
                  message: "El CI no puede tener más de 12 caracteres",
                },
              })}
            />
            {errors.CI && (
              <span className="text-sm text-red-500">{errors.CI.message}</span>
            )}
          </label>

          {/* Correo electrónico */}
          <label className="flex flex-col gap-1">
            Correo Electrónico
            <input
              type="email"
              className="input-dark"
              {...register("email", {
                required: {
                  value: true,
                  message: "Correo electrónico requerido",
                },
                maxLength: {
                  value: 30,
                  message: "El email no puede tener más de 30 caracteres",
                },
              })}
            />
            {errors.email && (
              <span className="text-sm text-red-500">
                {errors.email.message}
              </span>
            )}
          </label>

          {/* Selección de rol */}
          <label className="flex flex-col gap-1">
            Rol
            <select
              className="input-dark"
              {...register("FK_role", { required: true })}
            >
              <option value="">Seleccione un rol</option>
              {roles.map((role) => (
                <option key={role.PK_role} value={role.PK_role}>
                  {role.role}
                </option>
              ))}
            </select>
            {errors.FK_role && (
              <span className="text-sm text-red-500">Rol requerido</span>
            )}
          </label>

          {/* Contraseña */}
          <label className="flex flex-col gap-1">
            Contraseña
            <input
              type="password"
              className="input-dark"
              {...register("password", {
                required: {
                  value: true,
                  message: "Contraseña requerida",
                },
                minLength: {
                  value: 8,
                  message: "La contraseña debe tener al menos 8 caracteres",
                },
                validate: (value) => {
                  if (!/[A-Z]/.test(value)) {
                    return "Debe tener al menos una letra mayúscula";
                  }
                  if (!/[a-z]/.test(value)) {
                    return "Debe tener al menos una letra minúscula";
                  }
                  if (!/[0-9]/.test(value)) {
                    return "Debe tener al menos un número";
                  }
                  return true;
                },
              })}
            />
            {errors.password && (
              <span className="text-sm text-red-500">
                {errors.password.message}
              </span>
            )}
          </label>

          {/* Confirmar contraseña */}
          <label className="flex flex-col gap-1">
            Confirmar Contraseña
            <input
              type="password"
              className="input-dark"
              {...register("confirmPassword", {
                required: {
                  value: true,
                  message: "Confirmar contraseña es requerido",
                },
                validate: (value) => {
                  const { password } = getValues();
                  return password === value || "Las contraseñas no coinciden";
                },
              })}
            />
            {errors.confirmPassword && (
              <span className="text-sm text-red-500">
                {errors.confirmPassword.message}
              </span>
            )}
          </label>

          <section className="md:col-span-3 flex flex-col md:flex-row mt-4 items-center justify-between border-t border-zinc-800 pt-4 gap-4">
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

export default CreateUser;
