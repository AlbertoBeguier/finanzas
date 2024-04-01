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
import ChartDataLabels from "chartjs-plugin-datalabels"; // Importa el plugin de DataLabels
import "../styles/GraficosDeBarras.css";

// Registrar componentes necesarios de ChartJS y el plugin de DataLabels
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartDataLabels // Registra el plugin aquí
);

export const GraficoInflacionMensual = () => {
  const [dataInflacion, setDataInflacion] = useState([]);
  const [meses, setMeses] = useState(12); // Estado inicial de 12 meses

  const chartContainerStyle = {
    padding: "20px",
    margin: "20px auto",
    maxWidth: "calc(100% - 40px)",
    width: `${Math.max(meses * 70, 300)}px`,
    boxSizing: "border-box",
  };

  useEffect(() => {
    fetch("https://api.argentinadatos.com/v1/finanzas/indices/inflacion")
      .then(response => response.json())
      .then(data => {
        const datosFiltrados = data.length > meses ? data.slice(-meses) : data;
        setDataInflacion(datosFiltrados);
      })
      .catch(error => console.error("Error fetching data: ", error));
  }, [meses]);

  // Determina los valores máximos y mínimos después de obtener los datos filtrados
  const maxValue = Math.max(...dataInflacion.map(item => item.valor));
  const minValue = Math.min(...dataInflacion.map(item => item.valor));

  const chartData = {
    labels: dataInflacion.map(item => {
      const date = new Date(item.fecha); // Asume que item.fecha está en un formato compatible
      return date.toLocaleDateString("es-AR", {
        month: "short",
        year: "numeric",
      });
    }),

    datasets: [
      {
        label: "Inflación (%)",
        data: dataInflacion.map(item => item.valor),
        backgroundColor: dataInflacion.map(item => {
          if (item.valor === maxValue) {
            return "rgba(204, 250, 205, 0.5)"; // Verde para el máximo
          } else if (item.valor === minValue) {
            return "rgba(250, 211, 211, 0.5)"; // Rojo para el mínimo
          }
          return "rgba(54, 162, 235, 0.5)"; // Color estándar para los demás valores
        }),
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 2,
      },
    ],
  };

  const options = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: function (value) {
            return `${value}%`;
          },
        },
      },
    },
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: `Inflación Mensual - Últimos ${meses} Meses`,
      },
      // Configura las etiquetas de datos aquí
      datalabels: {
        anchor: "center",
        align: "center",
        color: "black",
        formatter: function (value) {
          return `${value.toFixed(2)} %`; // Formatea los valores a dos decimales
        },
      },
    },
  };

  return (
    <div className="grafico-container" style={chartContainerStyle}>
      <h3>{`Inflación Mensual - Últimos ${meses} Meses`}</h3>
      <label htmlFor="meses5">Seleccione la cantidad de meses: </label>
      <input
        className="input-meses"
        type="number"
        id="meses5"
        value={meses}
        onChange={e => setMeses(e.target.value)}
        min="10" // meses mínimos en el gráfico
      />
      {dataInflacion.length > 0 ? (
        <>
          <Bar data={chartData} options={options} />
          <span className="leyenda-personalizada">
            <span>
              <span
                className="indicador-color"
                style={{ backgroundColor: "#ccfacd" }}
              ></span>
              <span className="leyenda">Valor Máximo</span>
            </span>
            <span>
              <span
                className="indicador-color"
                style={{ backgroundColor: "rgb(250, 211, 211)" }}
              ></span>
              <span className="leyenda">Valor Mínimo</span>
            </span>
          </span>
        </>
      ) : (
        <div className="loading-container">
          <div className="spinner"></div>
          <span className="texto-spinner">Cargando datos...</span>
        </div>
      )}
    </div>
  );
};
