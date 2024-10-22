"use client";

import React from "react";

const GenerateCsv = () => {
  const items = [
    { description: "Vestido 1", quantity: 2, price: 50 },
    { description: "Cadena 2", quantity: 1, price: 100 },
  ];

  const generateCsv = () => {
    // Convertir los datos a CSV
    const csvRows = [];
    const headers = ["Descripción", "Cantidad", "Precio"];
    csvRows.push(headers.join(",")); // Añadir encabezados

    // Añadir los datos de los productos
    items.forEach(item => {
      const row = [
        item.description,
        item.quantity,
        item.price,
      ];
      csvRows.push(row.join(","));
    });

    // Unir todas las filas en un solo string
    const csvString = csvRows.join("\n");

    // Añadir BOM para UTF-8
    const bom = "\uFEFF";
    const fullCsv = bom + csvString;

    // Crear un Blob y un objeto URL para la descarga
    const blob = new Blob([fullCsv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "productos.csv"; // Nombre del archivo
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url); // Limpiar objeto URL
  };

  return <button onClick={generateCsv}>Descargar CSV</button>;
};

export default GenerateCsv;
