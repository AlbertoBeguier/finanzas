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

export const GraficoInflacionInteranual = () => {
  const [dataInflacion, setDataInflacion] = useState([]);
  const [meses, setMeses] = useState(12); // Estado para controlar la cantidad de meses a visualizar

  useEffect(() => {
    fetch(
      "https://api.argentinadatos.com/v1/finanzas/indices/inflacionInteranual"
    )
      .then(response => response.json())
      .then(data => {
        const datosFiltrados = data.slice(-meses); // Asumimos que la API devuelve los datos en orden cronológico
        setDataInflacion(datosFiltrados);
      })
      .catch(error => console.error("Error fetching data: ", error));
  }, [meses]);
  // Determina los valores máximos y mínimos después de obtener los datos filtrados
  const maxValue = Math.max(...dataInflacion.map(item => item.valor));
  const minValue = Math.min(...dataInflacion.map(item => item.valor));

  const chartData = {
    labels: dataInflacion.map(item => {
      const date = new Date(item.fecha);
      return date.toLocaleDateString("es-AR", {
        month: "short",
        year: "numeric",
      });
    }),
    datasets: [
      {
        label: "Inflación Interanual (%)",
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
        text: `Inflación Interanual - Últimos ${meses} Meses`,
      },
      datalabels: {
        color: "#444",
        anchor: "end",
        align: "top",
        formatter: value => `${value}%`,
      },
    },
  };

  // Ajusta el estilo del contenedor del gráfico dinámicamente basado en la cantidad de meses
  const chartContainerStyle = () => ({
    padding: "20px",
    margin: "20px auto",
    maxWidth: "calc(100% - 40px)",
    width: `${Math.max(meses * 70, 300)}px`, // Ajusta dinámicamente el ancho basado en los meses
    boxSizing: "border-box",
  });

  return (
    <div className="grafico-container" style={chartContainerStyle()}>
      <h3>{`Inflación Interanual - Últimos ${meses} Meses`}</h3>
      <p className="parrafo-greficos">
        Compara el nivel de precios de un mes específico con el nivel de precios
        del mismo mes en el año anterior.
      </p>
      <label htmlFor="meses">Seleccione la cantidad de meses: </label>
      <input
        className="input-meses"
        type="number"
        id="meses"
        value={meses}
        onChange={e => setMeses(Number(e.target.value))}
      />
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
    </div>
  );
};
