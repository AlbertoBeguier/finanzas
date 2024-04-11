import PropTypes from "prop-types";
import "../styles/InteresSimpleyCompuesto.css"; // Importa los estilos CSS
import { useState } from "react";

export const TablaInteresCompuestoIngEgr = ({
  capitalInicial,
  tasaInteres,
  cantidadPeriodos,
}) => {
  const [egresos, setEgresos] = useState(Array(cantidadPeriodos).fill(0));
  const [ingresos, setIngresos] = useState(Array(cantidadPeriodos).fill(0));

  const [inputEgresos, setInputEgresos] = useState(
    Array(cantidadPeriodos).fill("")
  );
  const [inputIngresos, setInputIngresos] = useState(
    Array(cantidadPeriodos).fill("")
  );

  const handleEgresoChange = (periodo, valor) => {
    const valorNumerico = parseFloat(valor.replace(/,/g, "")) || 0;
    setInputEgresos(prevInputEgresos => {
      const newInputEgresos = [...prevInputEgresos];
      newInputEgresos[periodo] = valor;
      for (let i = periodo + 1; i < newInputEgresos.length; i++) {
        if (newInputEgresos[i] === prevInputEgresos[periodo]) {
          newInputEgresos[i] = valor;
        }
      }
      return newInputEgresos;
    });
    setEgresos(prevEgresos => {
      const newEgresos = [...prevEgresos];
      newEgresos[periodo] = valorNumerico;
      for (let i = periodo + 1; i < newEgresos.length; i++) {
        if (newEgresos[i] === prevEgresos[periodo]) {
          newEgresos[i] = valorNumerico;
        }
      }
      return newEgresos;
    });
  };

  const handleIngresoChange = (periodo, valor) => {
    const valorNumerico = parseFloat(valor.replace(/,/g, "")) || 0;
    setInputIngresos(prevInputIngresos => {
      const newInputIngresos = [...prevInputIngresos];
      newInputIngresos[periodo] = valor;
      for (let i = periodo + 1; i < newInputIngresos.length; i++) {
        if (newInputIngresos[i] === prevInputIngresos[periodo]) {
          newInputIngresos[i] = valor;
        }
      }
      return newInputIngresos;
    });
    setIngresos(prevIngresos => {
      const newIngresos = [...prevIngresos];
      newIngresos[periodo] = valorNumerico;
      for (let i = periodo + 1; i < newIngresos.length; i++) {
        if (newIngresos[i] === prevIngresos[periodo]) {
          newIngresos[i] = valorNumerico;
        }
      }
      return newIngresos;
    });
  };

  const calcularFila = (periodo, capitalAnterior) => {
    const tasa = tasaInteres;
    const capitalFinalPeriodo = capitalAnterior * Math.pow(1 + tasa, 1);
    const interesesPeriodo = capitalFinalPeriodo - capitalAnterior;
    const rendimientoEfectivo = capitalFinalPeriodo / capitalInicial - 1;
    return {
      capitalInicial: capitalAnterior,
      interesesPeriodo,
      capitalFinal: capitalFinalPeriodo,
      rendimientoEfectivo,
    };
  };

  const formatearPesosArgentinos = valor => {
    return valor.toLocaleString("es-AR", {
      style: "currency",
      currency: "ARS",
    });
  };

  let capitalAnterior = capitalInicial;

  return (
    <div>
      <h3 className="tabla-interes-titulo-1">
        Tabla de Interés Compuesto - Retiros y colocaciones
      </h3>
      <table>
        <thead>
          <tr>
            <th className="tabla-interes-titulo-columna-1">Per</th>
            <th className="tabla-interes-titulo-columna-1">Capital Inicial</th>
            <th className="tabla-interes-titulo-columna-1">Interés</th>
            <th className="tabla-interes-titulo-columna-1">Capital Final</th>
            <th className="tabla-interes-titulo-columna-1">Tasa Efectiva</th>
            <th className="tabla-interes-titulo-columna-1 egreso-ingreso-columna">
              Egresos
            </th>
            <th className="tabla-interes-titulo-columna-1 egreso-ingreso-columna">
              Ingresos
            </th>
          </tr>
        </thead>
        <tbody>
          {[...Array(cantidadPeriodos).keys()].map(periodo => {
            const fila = calcularFila(periodo + 1, capitalAnterior);
            const egreso = egresos[periodo] || 0;
            const ingreso = ingresos[periodo] || 0;
            capitalAnterior = fila.capitalFinal - egreso + ingreso;
            const esMultiploDe12 = (periodo + 1) % 12 === 0;
            const trClasses = `tr-hover ${
              esMultiploDe12 ? "tr-multiplo-de-12" : ""
            }`; // Se ajusta el capital anterior
            return (
              <tr key={periodo} className={trClasses}>
                <td className="tabla-interes-filas-1">{periodo + 1}</td>
                <td className="tabla-interes-filas-1">
                  {formatearPesosArgentinos(fila.capitalInicial)}
                </td>
                <td className="tabla-interes-filas-1">
                  {formatearPesosArgentinos(fila.interesesPeriodo)}
                </td>
                <td className="tabla-interes-filas-1">
                  {formatearPesosArgentinos(fila.capitalFinal)}
                </td>
                <td className="tabla-interes-filas-1">
                  {(fila.rendimientoEfectivo * 100).toFixed(2)}%
                </td>
                <td className="tabla-interes-filas-1">
                  <input
                    className="input-egreso"
                    type="text"
                    value={inputEgresos[periodo]}
                    onChange={e => handleEgresoChange(periodo, e.target.value)}
                  />
                </td>
                <td className="tabla-interes-filas-1">
                  <input
                    className="input-ingreso"
                    type="text"
                    value={inputIngresos[periodo]}
                    onChange={e => handleIngresoChange(periodo, e.target.value)}
                  />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

TablaInteresCompuestoIngEgr.propTypes = {
  capitalInicial: PropTypes.number.isRequired,
  tasaInteres: PropTypes.number.isRequired,
  cantidadPeriodos: PropTypes.number.isRequired,
};
