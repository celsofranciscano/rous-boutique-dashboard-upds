import axios from "axios";

async function DetailPage({ params }) {
  const response = await axios.get(
    `${process.env.API_URL}/api/dashboard/assists/${params.PK_user}`
  );
  const assists = response.data;

  // Crear un objeto para almacenar la asistencia por día
  const attendanceData = {};

  // Procesar los datos de la API
  assists.forEach((attendance) => {
    const date = new Date(attendance.day);
    const day = date.getDate();
    const checkIn = new Date(attendance.checkIn).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const checkOut = new Date(attendance.checkOut).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    attendanceData[day] = `${day}. ${checkIn} - ${checkOut}`;
  });

  // Obtener el primer día y el último día del mes según el primer registro
  const firstDate = new Date(assists[0]?.day);
  const firstDay = new Date(firstDate.getFullYear(), firstDate.getMonth(), 1);
  const lastDay = new Date(firstDate.getFullYear(), firstDate.getMonth() + 1, 0);

  // Obtener el día de la semana del primer día del mes (0 = Domingo, 1 = Lunes, ..., 6 = Sábado)
  const startDay = firstDay.getDay(); 

  // Crear un arreglo para las semanas
  const weeks = [];
  let currentWeek = [];

  // Llenar las semanas
  for (let day = 1; day <= lastDay.getDate(); day++) {
    const currentDate = new Date(firstDate.getFullYear(), firstDate.getMonth(), day);
    
    // Agregar días hasta completar la semana
    if (day === 1) {
      // Completar días previos al primer día del mes
      for (let i = 0; i < startDay; i++) {
        currentWeek.push('-'); // Espacios vacíos para días no presentes en el mes
      }
    }
    
    // Agregar el día actual
    currentWeek.push(day);
    
    // Cuando la semana se llena (7 días), agregar a la lista de semanas
    if (currentWeek.length === 7) {
      weeks.push(currentWeek);
      currentWeek = []; // Reiniciar la semana
    }
  }

  // Agregar la última semana si tiene días
  if (currentWeek.length > 0) {
    while (currentWeek.length < 7) {
      currentWeek.push('-'); // Completar con espacios vacíos
    }
    weeks.push(currentWeek);
  }

  return (
    <section className="grid gap-4">
      <div className="py-4 p-2">
        <h1 className="text-2xl text-black dark:text-white font-medium">
          Asistencia del empleado por mes
        </h1>
      </div>

      <section className="p-4 border grid gap-4 dark:border-zinc-800 rounded-md">
        <h1 className="text-black dark:text-white font-normal text-lg pb-4 border-b dark:border-zinc-800">
          {firstDate.toLocaleString('es-ES', { month: 'long', year: 'numeric' })}
        </h1>

        <section className="overflow-x-auto  rounded-md ">
        <table className="w-full text-sm text-left text-zinc-400 bg-white dark:bg-zinc-950 rounded-md">
          <thead className="text-xs uppercase bg-zinc-900">
            <tr>
              <th className="px-3 py-3 text-white hover:cursor-pointer">Lunes</th>
              <th className="px-3 py-3 text-white hover:cursor-pointer">Martes</th>
              <th className="px-3 py-3 text-white hover:cursor-pointer">Miércoles</th>
              <th className="px-3 py-3 text-white hover:cursor-pointer">Jueves</th>
              <th className="px-3 py-3 text-white hover:cursor-pointer">Viernes</th>
              <th className="px-3 py-3 text-white hover:cursor-pointer">Sábado</th>
              <th className="px-3 py-3 text-white hover:cursor-pointer">Domingo</th>
            </tr>
          </thead>
          <tbody>
            {weeks.map((week, index) => (
              <tr key={index} className="border-b border-zinc-800">
                {week.map((day) => (
                  <td key={day} className="px-6 py-4 text-zinc-800 dark:text-zinc-400">
                    {attendanceData[day] || (day !== '-' ? `${day}:` : '-') }
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
        </section>
      </section>
    </section>
  );
}

export default DetailPage;
