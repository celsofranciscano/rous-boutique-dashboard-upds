import SalesByCategoryChart from "@/components/dashboard/analytics/sales/SalesByCategoryChart";
import SalesByProductChart from "@/components/dashboard/analytics/sales/SalesByProductChart";
import SalesByRegionChart from "@/components/dashboard/analytics/sales/SalesByRegionChart";
import TransactionsChart from "@/components/dashboard/analytics/sales/TransactionsChart";
import TotalSalesChart from "@/components/dashboard/analytics/sales/TotalSalesChart";
import ScatterPlotChart from "@/components/dashboard/analytics/sales/ScatterPlotChart";


async function DashboardPage() {


  return (
    <main className=" grid gap-4 md:grid-cols-2">
      <TotalSalesChart />
      <SalesByProductChart />
      <SalesByCategoryChart />
      <SalesByRegionChart />
      <TransactionsChart />
      <ScatterPlotChart />

   
    </main>
  );
}

export default DashboardPage;
