import { useState } from "react";

// Hook personalizado para formatear valores a pesos argentinos
export const useFormatPesosArgentinos = (inicial = "") => {
  const [valor, setValor] = useState(inicial);

  // Función para manejar el cambio en el input
  const handleChange = e => {
    setValor(e.target.value);
  };

  // Función para formatear el número al estilo de pesos argentinos
  const formatearAPesosArgentinos = valor => {
    // Eliminar caracteres no numéricos para el formateo
    const numero = valor.replace(/[^0-9.-]+/g, "");
    return new Intl.NumberFormat("es-AR", {
      style: "currency",
      currency: "ARS",
    }).format(numero);
  };

  // Valor formateado listo para ser mostrado
  const valorFormateado = valor ? formatearAPesosArgentinos(valor) : "";

  return [valor, handleChange, valorFormateado];
};
