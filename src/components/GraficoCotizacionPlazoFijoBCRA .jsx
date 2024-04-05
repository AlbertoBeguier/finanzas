import { useState, useMemo } from "react";
import { useEstadisticBCRAPlazoFijo } from "../hooks/useEstadisticBCRAPlazoFijo";
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

// Registro de componentes y plugins necesarios de Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartDataLabels
);

export const GraficoCotizacionPlazoFijoBCRA = () => {
  const { tasasPorMes, error, isLoading } = useEstadisticBCRAPlazoFijo();
  const [meses, setMeses] = useState(12);
  const chartContainerStyle = {
    padding: "20px",
    margin: "20px auto",
    maxWidth: "calc(100% - 10px)",
    minWidth: "33%",
    width: `max(${Math.max(meses * 90, 300)}px, 33%)`,
    boxSizing: "border-box",
  };

  const datosGrafico = useMemo(() => {
    if (!isLoading && !error && Object.keys(tasasPorMes).length > 0) {
      const mesesSeleccionados = Object.keys(tasasPorMes).sort().slice(-meses);

      const labels = mesesSeleccionados.map(mes => {
        const [year, month] = mes.split("-");
        const date = new Date(year, month - 1); // Los meses en JavaScript empiezan en 0
        return date
          .toLocaleDateString("es-AR", {
            month: "short",
            year: "numeric",
          })
          .replace(".", ""); // Elimina el punto final en la abreviatura del mes
      });

      const valores = mesesSeleccionados.map(mes => {
        const tasasMes = tasasPorMes[mes];
        return (
          (tasasMes.reduce((acc, curr) => acc + curr, 0) / tasasMes.length) *
          100
        );
      });

      // Determina los valores máximos y mínimos
      const maxValue = Math.max(...valores);
      const minValue = Math.min(...valores);

      return {
        labels,
        datasets: [
          {
            label: "Tasa Promedio Mensual (%)",
            data: valores,
            backgroundColor: valores.map(value => {
              if (value === maxValue) {
                return "rgba(204, 250, 205, 0.5)"; // Verde para el máximo
              } else if (value === minValue) {
                return "rgba(250, 211, 211, 0.5)"; // Rojo para el mínimo
              }
              return "rgba(54, 162, 235, 0.5)"; // Azul para los demás valores
            }),
            borderColor: "rgba(54, 162, 235, 1)",
            borderWidth: 2,
          },
        ],
      };
    }
    return { labels: [], datasets: [] };
  }, [isLoading, error, tasasPorMes, meses]);

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
        text: `TNA PF (Promedio BCRA) - Últimos ${meses} Meses`,
        font: {
          size: "22", // Ajusta esto a tu preferencia, valor en píxeles
          family: "Arial", // Ejemplo de cómo establecer la familia de la fuente
        },
        color: "#3e499c", // Establece el color de tu preferencia
      },
      datalabels: {
        anchor: "end",
        align: "top",
        color: "#444",
        formatter: value => `${value.toFixed(2)}%`,
      },
    },
  };

  return (
    <div className="grafico-container" style={chartContainerStyle}>
      <div className="leyenda-personalizada">
        <label htmlFor="mesesSelect1" style={{ marginRight: "10px" }}>
          Seleccione la cantidad de meses:
        </label>
        <input
          className="input-meses"
          type="number"
          id="mesesSelect1"
          value={meses}
          onChange={e => setMeses(Number(e.target.value))}
          min="10"
        />
      </div>
      {isLoading ? (
        <div className="loading-container">
          <div className="spinner"></div>
          <span className="texto-spinner">Cargando datos...</span>
        </div>
      ) : error ? (
        <p>Error: {error}</p>
      ) : (
        <>
          <Bar data={datosGrafico} options={options} />
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
      )}
    </div>
  );
};
