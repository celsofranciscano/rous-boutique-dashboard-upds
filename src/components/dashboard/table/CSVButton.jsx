function CSVButton({ data }) {
  const generateCsv = () => {
    if (!data || data.length === 0) {
      console.warn("No hay datos disponibles para exportar.");
      return;
    }

    const csvRows = [];

    // Obtener los encabezados dinámicamente desde los datos
    const headers = Object.keys(data[0]);
    csvRows.push(headers.join(","));

    // Añadir todos los datos, con manejo de comas y saltos de línea
    data.forEach((item) => {
      const row = headers.map((key) => {
        let cell = item[key] ? item[key].toString() : ""; // Convertir el valor a string
        // Escapar comas o saltos de línea
        if (cell.includes(",") || cell.includes("\n")) {
          cell = `"${cell}"`;
        }
        return cell;
      });
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
    a.download = "datos.csv"; // Nombre del archivo
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url); // Limpiar objeto URL
  };

  return (
    <button
      onClick={generateCsv}
      className="flex gap-1 border dark:border-zinc-800 bg-zinc-950 px-4 py-2 rounded-md text-zinc-500 dark:text-zinc-400 hover:bg-zinc-800"
    >
      <svg
        className="w-6 h-6"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        fill="none"
        viewBox="0 0 24 24"
      >
        <path
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M12 13V4M7 14H5a1 1 0 0 0-1 1v4a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-4a1 1 0 0 0-1-1h-2m-1-5-4 5-4-5m9 8h.01"
        />
      </svg>
      <span>CSV</span>
    </button>
  );
}

export default CSVButton;
