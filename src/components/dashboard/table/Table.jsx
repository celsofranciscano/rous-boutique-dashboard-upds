"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";
import { usePathname } from "next/navigation";
import CSVButton from "./CSVButton";
import GeneratePdfButton from "./GeneratePdf";

function Table({ url, columns, rows, name }) {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10); // Número de filas por página
  const [filterStatus, setFilterStatus] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: "", direction: "asc" });

  const pathname = usePathname();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/api/dashboard/${url}`);
        setData(response.data);
        setFilteredData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
    };
    fetchData();
  }, [url]);

  // Búsqueda
  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearch(value);
    const filtered = data.filter((row) =>
      rows.some((key) => String(row[key]).toLowerCase().includes(value))
    );
    setFilteredData(filtered);
    setCurrentPage(1); // Reinicia la paginación al buscar
  };

  // Filtrado por estado (activo/inactivo)
  const handleFilterStatus = (e) => {
    const status = e.target.value;
    setFilterStatus(status);
    const filtered = data.filter((row) =>
      status === "" ? true : row.status === (status === "Activos")
    );
    setFilteredData(filtered);
    setCurrentPage(1); // Reinicia la paginación al filtrar
  };

  // Ordenar
  const requestSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
    sortData(key, direction);
  };

  const sortData = (key, direction) => {
    const sortedData = [...filteredData].sort((a, b) => {
      if (typeof a[key] === "string") {
        return direction === "asc"
          ? a[key].localeCompare(b[key])
          : b[key].localeCompare(a[key]);
      } else {
        return direction === "asc" ? a[key] - b[key] : b[key] - a[key];
      }
    });
    setFilteredData(sortedData);
  };

  // Paginación
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = filteredData.slice(indexOfFirstRow, indexOfLastRow);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Cambiar el número de filas por página
  const handleRowsPerPageChange = (e) => {
    setRowsPerPage(Number(e.target.value));
    setCurrentPage(1); // Reinicia la paginación
  };

  return (
    <section className=" grid gap-4 shadow-md rounded-md border dark:border-zinc-800 p-4 ">
      {/* Barra de búsqueda y filtro */}
      <div className=" flex items-center justify-between">
        <div className="relative w-1/3">
          <input
            type="search"
            placeholder="Buscar..."
            value={search}
            onChange={handleSearch}
            className="w-full p-2 rounded-md border dark:border-zinc-800 dark:bg-zinc-950 dark:text-white pl-10 focus:ring-2 focus:ring-blue-500"
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m21 21-3.5-3.5M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z"
            />
          </svg>
        </div>

        <GeneratePdfButton data={data} />

        <CSVButton data={data} />

        {/* Filtro por estado como select */}
        <select
          className="p-2 rounded-md border dark:border-zinc-800 dark:bg-zinc-950 dark:text-white"
          value={filterStatus}
          onChange={handleFilterStatus}
        >
          <option value="">Filtrar por estado</option>
          <option value="Activos">Activos</option>
          <option value="Inactivos">Inactivos</option>
        </select>

        <Link
          href={`${pathname}/create`}
          className=" flex gap-2 bg-white text-black px-4 py-2 rounded-md"
        >
          <span>Agregar {name}</span>

          <svg
            className="w-6 h-6 text-black"
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
              d="M5 12h14m-7 7V5"
            />
          </svg>
        </Link>
      </div>

      <div className="flex items-center justify-between ">
        {/* Total de registros */}
        <div className="mb-4">
          <span className="text-gray-500">
            Total de registros: {filteredData.length}
          </span>
        </div>

        {/* Selección de filas por página */}
        <select
          className="p-2 rounded-md border focus:ring-0  focus:border-none dark:border-zinc-800 dark:bg-zinc-950 dark:text-white"
          value={rowsPerPage}
          onChange={handleRowsPerPageChange}
        >
          <option value={10}>Filas por página: 10</option>
          <option value={20}>Filas por página: 20</option>
          <option value={50}>Filas por página: 50</option>
        </select>
      </div>

      {/* Tabla */}
      <section className="overflow-x-auto  rounded-md ">
        <table className="w-full text-sm text-left text-zinc-400 bg-white dark:bg-zinc-950 rounded-md">
          <thead className="text-xs uppercase bg-zinc-900">
            <tr>
              {columns.map((column, index) => (
                <th
                  key={index}
                  className="px-6 py-3 text-white hover:cursor-pointer"
                  // Evitamos el onClick y el icono en las columnas "Estado" y "Acciones"
                  onClick={() =>
                    column !== "Estado" && column !== "Acciones"
                      ? requestSort(rows[index])
                      : null
                  }
                >
                  {column}
                  {column !== "Estado" && column !== "Acciones" && (
                    <svg
                      className="inline h-5 w-5 ml-1"
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                    >
                      <path d="M8 10l4-6 4 6H8zm8 4l-4 6-4-6h8z" />
                    </svg>
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {currentRows.map((row, index) => (
              <tr key={index} className="border-b border-zinc-800">
                {rows.map((rowField, rowIndex) => (
                  <td
                    key={rowIndex}
                    className="px-6 py-4 text-zinc-800 dark:text-zinc-400"
                  >
                    {rowField === "status" ? (
                      row.status ? (
                        <span className="px-2 py-1 rounded-md bg-green-500 text-white">
                          Activo
                        </span>
                      ) : (
                        <span className="px-2 py-1 rounded-md bg-red-500 text-white">
                          Inactivo
                        </span>
                      )
                    ) : (
                      row[rowField]
                    )}
                  </td>
                ))}
                <td className="flex items-center py-3 justify-center text-blue-500">
                  <Link href={`${pathname}/${row[rows[0]]}`}>
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                    >
                      <path d="M21 12c0 1.2-4.03 6-9 6s-9-4.8-9-6c0-1.2 4.03-6 9-6s9 4.8 9 6z" />
                      <path d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
                    </svg>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {/* Paginación */}
      <div className="flex items-center justify-between mt-4 space-x-2">
        {/* Cantidad que se ve en la pagina */}
        <div className="mb-4">
          <span className="text-gray-500">
            {indexOfFirstRow + 1} a{" "}
            {Math.min(indexOfLastRow, filteredData.length)} de{" "}
            {filteredData.length} Registros
          </span>
        </div>
        <div className="flex items-center bg-zinc-900 rounded-md text-xs py-2 px-4">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className={`px-3 py-1 text-white ${
              currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          {Array.from(
            { length: Math.ceil(filteredData.length / rowsPerPage) },
            (_, index) => (
              <button
                key={index}
                onClick={() => handlePageChange(index + 1)}
                className={`px-3 py-1 rounded ${
                  currentPage === index + 1
                    ? "bg-white text-black"
                    : " text-zinc-400"
                }`}
              >
                {index + 1}
              </button>
            )
          )}

          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={
              currentPage >= Math.ceil(filteredData.length / rowsPerPage)
            }
            className={`px-3 py-1 text-white ${
              currentPage >= Math.ceil(filteredData.length / rowsPerPage)
                ? "opacity-50 cursor-not-allowed"
                : ""
            }`}
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        <div className="flex gap-4 text-xs ">
          <button
            disabled={currentPage === 1}
            onClick={() => handlePageChange(currentPage - 1)}
            className={`rounded-md bg-zinc-900 py-2 px-4 ${
              currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            Anterior
          </button>
          <button
            disabled={
              currentPage >= Math.ceil(filteredData.length / rowsPerPage)
            }
            onClick={() => handlePageChange(currentPage + 1)}
            className={`rounded-md bg-zinc-900 py-2 px-4 ${
              currentPage >= Math.ceil(filteredData.length / rowsPerPage)
                ? "opacity-50 cursor-not-allowed"
                : ""
            }`}
          >
            Siguiente
          </button>
        </div>
      </div>
    </section>
  );
}

export default Table;
