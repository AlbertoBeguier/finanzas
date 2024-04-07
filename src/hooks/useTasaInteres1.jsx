import { useState, useEffect } from "react";

export const useTasaInteres1 = (unidadTiempo, valorInicial = "") => {
  const [tasa, setTasa] = useState(valorInicial);
  const [mensajeError, setMensajeError] = useState("");

  useEffect(() => {
    sessionStorage.setItem("tasa", tasa);
  }, [tasa]);
  const handleChangeTasa = e => {
    const valorEntrada = e.target.value;
    const valor = valorEntrada.replace(/,/g, ".");
    if (valor.match(/^\d*\.?\d*$/) || valor === "") {
      setTasa(valor);
      setMensajeError("");
    } else {
      setMensajeError(
        "Formato inválido. Usa un punto o coma como separador decimal."
      );
    }
  };

  const obtenerTerminoTasa = () => {
    switch (unidadTiempo) {
      case "día":
        return "diaria";
      case "mes":
        return "mensual";
      case "año":
        return "anual";
      default:
        return "";
    }
  };

  // Calcular el porcentaje y concatenar con el término adecuado
  const tasaEnPorcentaje = tasa
    ? `${(parseFloat(tasa) * 100).toFixed(2)}% ${obtenerTerminoTasa()}`
    : "";

  return [tasa, handleChangeTasa, mensajeError, tasaEnPorcentaje];
};
