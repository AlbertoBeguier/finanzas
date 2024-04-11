import { useState } from "react";

export function TasasDeInteresPro() {
  const [tasa, setTasa] = useState("");
  const [periodicidad, setPeriodicidad] = useState("Mensual");

  // Función para convertir la tasa de porcentaje a decimal
  const convertirTasaADecimal = tasa => (tasa / 100).toFixed(2);

  // Determina la abreviatura basada en la periodicidad seleccionada
  const obtenerAbreviatura = periodicidad => {
    switch (periodicidad) {
      case "Anual":
        return "TNA";
      case "Mensual":
        return "TNM";
      case "Diaria":
        return "TND";
      default:
        return "";
    }
  };

  return (
    <div>
      <label htmlFor="periodicidad">TASA NOMINAL</label>
      <select
        name="periodicidad"
        id="periodicidad"
        value={periodicidad}
        onChange={e => setPeriodicidad(e.target.value)}
      >
        <option value="Anual">Anual</option>
        <option value="Mensual">Mensual</option>
        <option value="Diaria">Diaria</option>
      </select>
      <div style={{ display: "flex", alignItems: "center" }}>
        <input
          type="number"
          value={tasa}
          onChange={e => setTasa(e.target.value)}
          placeholder="Ingrese la tasa en %"
          style={{ marginRight: "5px" }}
        />
        <span>%</span>
      </div>
      {/* Renderizar la selección y conversión de la tasa con la abreviatura correcta */}
      {tasa && (
        <p>
          Tasa Nominal {periodicidad} {tasa} % --{" "}
          {obtenerAbreviatura(periodicidad)} {convertirTasaADecimal(tasa)}
        </p>
      )}
    </div>
  );
}
