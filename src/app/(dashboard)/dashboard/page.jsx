import GenerateCsv from "@/components/dashboard/common/GenerarCSV";
import GeneratePdf from "@/components/dashboard/table/GeneratePdf";

function DashboardPage() {
    return ( 
      <main>
        <h1>Esto es Dashboard</h1>
        <GeneratePdf />
        <p>CSV</p>
        <GenerateCsv />
      </main>
     );
  }
  
  export default DashboardPage;