import SalesByCategoryChart from "@/components/dashboard/analytics/sales/SalesByCategoryChart";
import SalesByProductChart from "@/components/dashboard/analytics/sales/SalesByProductChart";
import SalesByRegionChart from "@/components/dashboard/analytics/sales/SalesByRegionChart";
import TransactionsChart from "@/components/dashboard/analytics/sales/TransactionsChart";
import TotalSalesChart from "@/components/dashboard/analytics/sales/TotalSalesChart";
import ScatterPlotChart from "@/components/dashboard/analytics/sales/ScatterPlotChart";

import axios from "axios";
import { cookies } from "next/headers";

async function DashboardPage() {
  const cookieStore = cookies();
  const sessionToken = cookieStore.get("next-auth.session-token");

  const response = await axios.get(`${process.env.API_URL}/api/protegido`, {
    headers: {
      Authorization: `Bearer ${sessionToken.value}`, // Enviar el token directamente
    },
  });

  return (
    <main className=" grid gap-4 md:grid-cols-2">
      <TotalSalesChart />
      <SalesByProductChart />
      <SalesByCategoryChart />
      <SalesByRegionChart />
      <TransactionsChart />
      <ScatterPlotChart />

      <section>
        <h1>Lista de roles</h1>
        {response.data.map((role) => (
          <h1 className="bg-zinc-900 m-4 p-4 rounded-md" key={role.PK_role}>
            {role.role}
          </h1>
        ))}
      </section>
    </main>
  );
}

export default DashboardPage;
