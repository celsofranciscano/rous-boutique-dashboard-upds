import Table from "@/components/dashboard/table/Table";
function ProductsPage() {
  const columns = [
    "ID",
    "Producto",
    "SKU",
    "Precio",
    "Oferta",
    "Stock",
    "Estado",
    "Acciones",
  ];

  const rows = [
    "PK_product",
    "name",
    "SKU",
    "regularPrice",
    "offerPrice",
    "stock",
    "status",
  ];

  return (
    <section className="grid gap-4">
      <div className="py-4 p-2 ">
        <h1 className="text-2xl text-zinc-200 font-medium">Productos</h1>
      </div>

      <Table
        url={"products"}
        columns={columns}
        rows={rows}
        name={"producto"}
    
      />
    </section>
  );
}

export default ProductsPage;
