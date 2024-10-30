import Table from "@/components/dashboard/table/Table";
function ProductsPage() {
  const columns = [
    "ID",
    "Producto",
    "Barcode",
    "Precio",
    "Oferta",
    "Existencia",
    "Estado",
    "Acciones",
  ];

  const rows = [
    "PK_product",
    "name",
    "barcode",
    "regularPrice",
    "offerPrice",
    "isExisting",
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
