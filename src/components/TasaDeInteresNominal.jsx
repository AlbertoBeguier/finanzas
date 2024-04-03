import { useState } from "react";
import "../styles/TasaDeInteresNominal.css";
export const TasaDeInteresNominal = () => {
  const [tasaNominal, setTasaNominal] = useState("");
  const [periodo, setPeriodo] = useState("anual");
  const [tasaMensual, setTasaMensual] = useState("");
  const [tasaDiaria, setTasaDiaria] = useState("");
  const [tasaAnual, setTasaAnual] = useState("");
  const [mostrarResultados, setMostrarResultados] = useState(false); // Nuevo estado para controlar la visualización

  const calcularTasas = () => {
    let tasaAnualTmp, tasaMensualTmp, tasaDiariaTmp;

    switch (periodo) {
      case "anual":
        tasaAnualTmp = parseFloat(tasaNominal);
        tasaMensualTmp = tasaAnualTmp / 12;
        tasaDiariaTmp = tasaAnualTmp / 365;
        break;
      case "mensual":
        tasaMensualTmp = parseFloat(tasaNominal);
        tasaAnualTmp = tasaMensualTmp * 12;
        tasaDiariaTmp = tasaAnualTmp / 365;
        break;
      case "diaria":
        tasaDiariaTmp = parseFloat(tasaNominal);
        tasaAnualTmp = tasaDiariaTmp * 365;
        tasaMensualTmp = tasaAnualTmp / 12;
        break;
      default:
        console.log("Selecciona un periodo válido.");
    }

    setTasaAnual(tasaAnualTmp.toFixed(2));
    setTasaMensual(tasaMensualTmp.toFixed(6));
    setTasaDiaria(tasaDiariaTmp.toFixed(8));
    setMostrarResultados(true); // Habilitar la visualización de los resultados
  };

  return (
    <div>
      <h5 className="titulo-tasa-nominal">Tasa Nominal</h5>
      <div className="contenedor-tasa-nominal">
        <input
          className="input-tasa-nominal"
          type="number"
          placeholder="Tasa Nominal"
          value={tasaNominal}
          onChange={e => setTasaNominal(e.target.value)}
        />
        <select
          className="select-tasa-nominal"
          value={periodo}
          onChange={e => setPeriodo(e.target.value)}
        >
          <option value="anual">Anual</option>
          <option value="mensual">Mensual</option>
          <option value="diaria">Diaria</option>
        </select>
        <button className="button-tasa-nominal" onClick={calcularTasas}>
          Calcular Tasas
        </button>
      </div>
      <br />
      {/* Aplicar la condición para mostrar todo el contenedor de resultados */}
      {mostrarResultados && (
        <div className="contenedor-padre-tasa-nominal-1">
          <div className="contenedor-tasa-nominal-1">
            <>
              <p>
                Tasa Anual: {tasaAnual} (
                {(parseFloat(tasaAnual) * 100).toFixed(2)} %)
              </p>
              <p>
                Tasa Mensual: {tasaMensual} (
                {(parseFloat(tasaMensual) * 100).toFixed(2)} %)
              </p>
              <p>
                Tasa Diaria: {tasaDiaria} (
                {(parseFloat(tasaDiaria) * 100).toFixed(2)} %)
              </p>
            </>
          </div>
        </div>
      )}
      <br />
    </div>
  );
};
