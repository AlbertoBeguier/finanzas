import { useState } from "react";

export const useTiempoDeLaOperacion = (
  valorInicialCantidad = "1",
  valorInicialUnidad = "mes"
) => {
  const [cantidadTiempo, setCantidadTiempo] = useState(valorInicialCantidad);
  const [unidadTiempo, setUnidadTiempo] = useState(valorInicialUnidad);

  const handleCantidadTiempoChange = e => {
    setCantidadTiempo(e.target.value);
  };

  const handleUnidadTiempoChange = e => {
    setUnidadTiempo(e.target.value);
  };

  const renderizarTiempo = () => {
    let texto = cantidadTiempo + " ";
    if (cantidadTiempo > 1) {
      switch (unidadTiempo) {
        case "día":
          texto += "días";
          break;
        case "mes":
          texto += "meses";
          break;
        case "año":
          texto += "años";
          break;
        default:
          texto += unidadTiempo;
      }
    } else {
      texto += unidadTiempo;
    }
    return texto;
  };

  return [
    cantidadTiempo,
    unidadTiempo,
    handleCantidadTiempoChange,
    handleUnidadTiempoChange,
    renderizarTiempo,
  ];
};
