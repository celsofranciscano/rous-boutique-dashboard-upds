"use client";

import React, { useEffect, useRef, useState } from "react";
import { Chart, registerables } from "chart.js";

Chart.register(...registerables);

function SalesByProductChart() {
  const [productSales, setProductSales] = useState([]);
  const chartRef = useRef(null);
  const chartInstanceRef = useRef(null); // Referencia para guardar la instancia del gráfico

  useEffect(() => {
    const fetchData = async () => {
      setProductSales([300, 500, 700, 200, 1000]); // Datos de ejemplo
    };
    fetchData();
  }, []);

  useEffect(() => {
    // Destruye el gráfico existente si existe para evitar la reutilización del canvas
    if (chartInstanceRef.current) {
      chartInstanceRef.current.destroy();
    }

    const ctx = chartRef.current.getContext("2d");
    chartInstanceRef.current = new Chart(ctx, {
      type: "bar",
      data: {
        labels: [
          "Producto A",
          "Producto B",
          "Producto C",
          "Producto D",
          "Producto E",
        ],
        datasets: [
          {
            label: "Ventas por Producto",
            data: productSales,
            backgroundColor: "rgba(54, 162, 235, 0.6)",
          },
        ],
      },
      options: { responsive: true },
    });

    // Limpia la instancia del gráfico cuando el componente se desmonte
    return () => {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }
    };
  }, [productSales]);

  return (
    <div className="border dark:border-zinc-800  p-8 shadow-md rounded-md">
      <h1 className="text-xl font-semibold mb-4 text-black dark:text-white">
        Ventas por Producto
      </h1>
      <canvas ref={chartRef}></canvas>
    </div>
  );
}

export default SalesByProductChart;
