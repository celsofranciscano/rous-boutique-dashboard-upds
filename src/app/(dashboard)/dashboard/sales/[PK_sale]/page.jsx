"use client";
import { useRef, useState, useEffect } from "react";
import VentaBarcode from "@/components/dashboard/barcode/VentaBarcode";
import axios from "axios";

function DetailPage({ params }) {
  const printRef = useRef();
  const [sale, setSale] = useState(null);
  const [createdAt, setCreatedAt] = useState("");
  const [revalidate, setRevalidate]= useState(false)

  useEffect(() => {
    // Función para obtener los detalles de la venta desde la API
    const fetchSaleData = async () => {
      try {
        const response = await axios.get(`/api/dashboard/sales/${params.PK_sale}`);
        const saleData = response.data;
        setSale(saleData);

        // Formatear la fecha de creación a un formato legible
        const formattedDate = new Date(saleData.createdAt).toLocaleDateString("es-ES", {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
        });
        setCreatedAt(formattedDate);
      } catch (error) {
        console.error("Error al obtener los datos de la venta:", error);
      }
    };

    fetchSaleData();
  }, [revalidate]);

  const handlePrint = () => {
    const originalContents = document.body.innerHTML;
    const printContents = printRef.current.innerHTML;

    document.body.innerHTML = printContents;
    window.print();
    document.body.innerHTML = originalContents;
    window.location.reload(); // recargar para restaurar los scripts y estilos
  };

  if (!sale) {
    return <p>Cargando...</p>;
  }

  return (
    <section className="grid gap-4 pb-8">
      <div className="py-4 p-2">
        <h1 className="text-2xl text-black dark:text-white font-medium">
          Detalle de Venta
        </h1>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <VentaBarcode params={params} setRevalidate={setRevalidate} revalidate={revalidate} />
        </div>

        <div className="grid gap-4">
          {/* Información de la Venta */}
          <section
            ref={printRef}
            className="p-4 border grid gap-4 dark:border-zinc-800 rounded-md"
          >
            <h1 className="text-black dark:text-white font-normal text-lg pb-4 border-b dark:border-zinc-800">
              Información de la venta
            </h1>

            <div className="grid grid-cols-2 gap-4 dark:text-zinc-400 text-zinc-500">
              <div className="flex flex-col gap-1">
                <strong>Cliente:</strong>
                <span>{sale.customerName || "N/A"}</span>
              </div>
              <div className="flex flex-col gap-1">
                <strong>CI:</strong>
                <span>{sale.customerCI || "N/A"}</span>
              </div>
              <div className="flex flex-col gap-1">
                <strong>Creado el:</strong>
                <span>{createdAt}</span>
              </div>
              <div className="flex flex-col gap-1">
                <strong>ID de la venta:</strong>
                <span>{sale.PK_sale || "N/A"}</span>
              </div>
            </div>

            <h2 className="text-black dark:text-white font-normal text-lg pb-2 border-b dark:border-zinc-800 mt-4">
              Detalles de la venta
            </h2>

            <div className="grid grid-cols-4 gap-4 text-black dark:text-white font-semibold">
              <p>Descripción</p>
              <p>Precio Unitario</p>
              <p>Cantidad</p>
              <p>Total</p>
            </div>

            <div className="grid gap-2">
              {sale.saleDetails.map((detail) => (
                <div
                  key={detail.PK_saledetail}
                  className="grid grid-cols-4 gap-4 py-2 border-b dark:border-zinc-800"
                >
                  <p>{detail.product.name}</p>
                  <p>{detail.product.regularPrice} Bs</p>
                  <p>1</p>
                  <p>{detail.product.regularPrice} Bs</p>
                </div>
              ))}
            </div>

            <div className="grid gap-2 mt-4">
              <div className="flex justify-between">
                <p>Subtotal:</p>
                <p>{sale.totalAmount} Bs</p>
              </div>
              <div className="flex justify-between">
                <p>IVA (15%):</p>
                <p>{(sale.totalAmount * 0.15).toFixed(2)} Bs</p>
              </div>
              <div className="flex justify-between">
                <p>Descuento (5%):</p>
                <p>{(sale.totalAmount * 0.05).toFixed(2)} Bs</p>
              </div>
              <div className="flex justify-between font-bold text-lg">
                <p>Total a Pagar:</p>
                <p>{(sale.totalAmount * 1.1).toFixed(2)} Bs</p>
              </div>
            </div>
          </section>

          <button
            onClick={handlePrint}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            Imprimir
          </button>
        </div>
      </div>
    </section>
  );
}

export default DetailPage;
