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
  const { cotizaciones, error, isLoading } = useEstadisticBCRAPlazoFijo();
  const [meses, setMeses] = useState(12);
  const chartContainerStyle = {
    padding: "20px",
    margin: "20px auto",
    maxWidth: "calc(100% - 40px)", // Asegura que el gráfico no exceda el ancho disponible.
    minWidth: "33%", // Asegura que el gráfico ocupe al menos un 33% de la pantalla.
    width: `max(${Math.max(meses * 70, 300)}px, 33%)`, // Utiliza el mayor valor entre el cálculo basado en meses y el 33% de la pantalla.
    boxSizing: "border-box",
  };

  const datosGrafico = useMemo(() => {
    if (!isLoading && !error && cotizaciones.length > 0) {
      const fechaLimite = new Date();
      fechaLimite.setMonth(fechaLimite.getMonth() - meses);
      const cotizacionesFiltradas = cotizaciones.filter(
        ({ d }) => new Date(d) >= fechaLimite
      );

      const agrupadoPorMes = cotizacionesFiltradas.reduce((acc, { d, v }) => {
        const mes = d.slice(0, 7); // Año-Mes
        if (!acc[mes]) {
          acc[mes] = [];
        }
        acc[mes].push(v);
        return acc;
      }, {});

      const labels = Object.keys(agrupadoPorMes).map(fecha => {
        const [year, month] = fecha.split("-");
        return new Date(year, month - 1)
          .toLocaleDateString("es-ES", {
            month: "short",
            year: "numeric",
          })
          .replace(".", "");
      });

      const valores = Object.values(agrupadoPorMes).map(valores => {
        const sum = valores.reduce((acc, val) => acc + val, 0);
        return sum / valores.length;
      });

      return {
        labels,
        datasets: [
          {
            label: "Promedio Mensual",
            data: valores,
            backgroundColor: valores.map(value =>
              value === Math.max(...valores)
                ? "rgba(204, 250, 205, 0.5)"
                : value === Math.min(...valores)
                ? "rgba(250, 211, 211, 0.5)"
                : "rgba(54, 162, 235, 0.5)"
            ),
            borderColor: "rgba(54, 162, 235, 1)",
            borderWidth: 1,
          },
        ],
      };
    }
    return { labels: [], datasets: [] };
  }, [isLoading, error, cotizaciones, meses]);

  const options = {
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: function (value) {
            return `${value.toFixed(2)}%`;
          },
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: ` TNA PF (Promedio BCRA) - Últimos ${meses} Meses`,
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
      <h3>{`TNA PF (Promedio BCRA) - Últimos ${meses} Meses`}</h3>
      <label htmlFor="mesesSelect1">Seleccione la cantidad de meses:</label>
      <input
        className="input-meses"
        type="number"
        id="mesesSelect1"
        value={meses}
        onChange={e => setMeses(Number(e.target.value))}
        min="10"
      />
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
