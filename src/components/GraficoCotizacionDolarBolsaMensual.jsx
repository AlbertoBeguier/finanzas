import { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
import "../styles/GraficosDeBarras.css";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartDataLabels
);

export const GraficoCotizacionDolarBolsaMensual = () => {
  const [datosCotizacion, setDatosCotizacion] = useState([]);
  const [meses, setMeses] = useState(12); // Puedes ajustar este valor inicial según prefieras
  const chartContainerStyle = {
    padding: "20px",
    margin: "20px auto",
    maxWidth: "calc(100% - 10px)",
    width: `${Math.max(meses * 90, 300)}px`,
    boxSizing: "border-box",
  };
  useEffect(() => {
    const hoy = new Date();
    const mesActual = `${hoy.getFullYear()}-${String(
      hoy.getMonth() + 1
    ).padStart(2, "0")}`;

    fetch("https://api.argentinadatos.com/v1/cotizaciones/dolares")
      .then(response => response.json())
      .then(data => {
        const datosPorMes = {};
        data.forEach(({ casa, compra, venta, fecha }) => {
          if (casa === "bolsa") {
            const [año, mes] = fecha.split("-").slice(0, 2);
            const clave = `${año}-${mes}`;
            if (
              clave !== mesActual &&
              (!datosPorMes[clave] || datosPorMes[clave].fecha < fecha)
            ) {
              // Excluye el mes actual durante el procesamiento de datos
              datosPorMes[clave] = { compra, venta, fecha };
            }
          }
        });
        const datosFiltrados = Object.values(datosPorMes)
          .sort((a, b) => new Date(a.fecha) - new Date(b.fecha))
          .slice(-meses);
        setDatosCotizacion(datosFiltrados);
      })
      .catch(error => console.error("Error fetching data: ", error));
  }, [meses]);

  const chartData = {
    labels: datosCotizacion.map(item => {
      const date = new Date(item.fecha); // Asume que item.fecha está en un formato compatible
      return date.toLocaleDateString("es-AR", {
        month: "short",
        year: "numeric",
      });
    }),
    datasets: [
      {
        label: "Compra",
        data: datosCotizacion.map(item => item.compra),
        backgroundColor: "rgba(204, 250, 205, 0.5)",
        borderColor: "rgba(204, 250, 205, 1)",
        borderWidth: 2,
      },
      {
        label: "Venta",
        data: datosCotizacion.map(item => item.venta),
        backgroundColor: "rgba(54, 162, 235, 0.5)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 2,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: true, // Asegúrate de que esto esté establecido en true
    aspectRatio: 3,
    scales: {
      y: {
        beginAtZero: true,
      },
    },
    plugins: {
      legend: {
        display: true,
        position: "top",
      },
      title: {
        display: true,
        text: `Cotización del Dólar bolsa- Últimos ${meses} Meses`,
        font: {
          size: "22", // Ajusta esto a tu preferencia, valor en píxeles
          family: "Arial", // Ejemplo de cómo establecer la familia de la fuente
        },
        color: "#3e499c", // Establece el color de tu preferencia
      },
      datalabels: {
        display: meses <= 36,
        anchor: "center",
        align: "center",
        color: "black",
        rotation: 270, // Rota las etiquetas para que estén verticales
        formatter: function (value) {
          return `$ ${value.toFixed(2)}`; // Formatea los valores a dos decimales
        },
      },
    },
  };

  return (
    <>
      <div className="grafico-container" style={chartContainerStyle}>
        <div className="leyenda-personalizada">
          <label htmlFor="meses1" style={{ marginRight: "10px" }}>
            Seleccione la cantidad de meses:
          </label>
          <input
            className="input-meses"
            type="number"
            id="meses1"
            value={meses}
            onChange={e => setMeses(e.target.value)}
            min="10" // meses mínimos en el gráfico
          />{" "}
        </div>
        {datosCotizacion.length > 0 ? (
          <>
            <Bar data={chartData} options={options} />
          </>
        ) : (
          <div className="loading-container">
            <div className="spinner"></div>
            <span className="texto-spinner">Cargando datos...</span>
          </div>
        )}
      </div>
    </>
  );
};
