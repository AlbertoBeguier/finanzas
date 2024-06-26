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

export const GraficoInflacionAcumulada = () => {
  const [dataInflacionAcumulada, setDataInflacionAcumulada] = useState([]);
  const [labels, setLabels] = useState([]);
  const [meses, setMeses] = useState(3); // Estado inicial de 12 meses

  const chartContainerStyle = {
    padding: "20px",
    margin: "20px auto",
    maxWidth: "calc(100% - 10px)", // Asegura que el gráfico no exceda el ancho disponible.
    minWidth: "%", // Asegura que el gráfico ocupe al menos un 33% de la pantalla.
    width: `max(${Math.max(meses * 90, 300)}px, 33%)`, // Utiliza el mayor valor entre el cálculo basado en meses y el 33% de la pantalla.
    boxSizing: "border-box",
  };

  useEffect(() => {
    fetch("https://api.argentinadatos.com/v1/finanzas/indices/inflacion")
      .then(response => response.json())
      .then(data => {
        const datosFiltrados = data.slice(-meses); // Tomamos los últimos 'meses' de registros
        let acumulado = 100; // Valor base para el cálculo del índice
        const valoresAcumulados = datosFiltrados.map(item => {
          acumulado *= 1 + item.valor / 100; // Calculamos el acumulado
          return acumulado - 100; // Restamos 100 para mostrar el porcentaje sobre el valor base
        });

        setDataInflacionAcumulada(valoresAcumulados);

        const etiquetas = datosFiltrados.map(item => {
          const date = new Date(item.fecha); // Asume que item.fecha está en un formato compatible
          return date.toLocaleDateString("es-AR", {
            month: "short",
            year: "numeric",
          });
        });
        setLabels(etiquetas);
      })
      .catch(error => console.log("Error fetching data:", error));
  }, [meses]);

  const chartData = {
    labels,
    datasets: [
      {
        label: "Inflación Acumulada (%)",
        data: dataInflacionAcumulada,
        backgroundColor: "rgba(54, 162, 235, 0.5)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 2,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: true, // Asegúrate de que esto esté establecido en true
    aspectRatio: 2,
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
        position: "top",
      },
      title: {
        display: true,
        text: `Inflación Acumulada - Últimos ${meses} Meses`,
        font: {
          size: "22", // Ajusta esto a tu preferencia, valor en píxeles
          family: "Arial", // Ejemplo de cómo establecer la familia de la fuente
        },
        color: "#3e499c", // Establece el color de tu preferencia
      },
      // Configura las etiquetas de datos aquí
      datalabels: {
        display: meses <= 18,
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
    <>
      <div className="grafico-container" style={chartContainerStyle}>
        <div className="leyenda-personalizada">
          <label htmlFor="meses" style={{ marginRight: "10px" }}>
            Seleccione la cantidad de meses:
          </label>
          <input
            className="input-meses"
            type="number"
            id="meses"
            value={meses}
            onChange={e => setMeses(Number(e.target.value))}
            min="1"
          />{" "}
        </div>
        {dataInflacionAcumulada.length > 0 ? (
          <Bar data={chartData} options={options} />
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
