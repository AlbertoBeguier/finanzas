import PropTypes from "prop-types";
import "../styles/InteresSimpleyCompuesto.css"; // Importa los estilos CSS

export const TablaInteresCompuesto = ({
  capitalInicial,
  tasaInteres,
  cantidadPeriodos,
}) => {
  // Función para calcular los valores de cada fila de la tabla
  const calcularFila = (periodo, capitalAnterior) => {
    const tasa = tasaInteres;
    const capitalFinalPeriodo = capitalAnterior * Math.pow(1 + tasa, 1); // Calculamos para un período
    const interesesPeriodo = capitalFinalPeriodo - capitalAnterior;
    // El rendimiento efectivo se calcula como el porcentaje de ganancia sobre el capital inicial
    const rendimientoEfectivo = capitalFinalPeriodo / capitalInicial - 1;
    return {
      capitalInicial: capitalAnterior, // Usamos el capital del período anterior como "inicial" para este cálculo
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
      <h3 className="tabla-interes-titulo">Tabla de Interés Compuesto</h3>
      <table>
        <thead>
          <tr>
            <th className="tabla-interes-titulo-columna">Per</th>
            <th className="tabla-interes-titulo-columna">Capital Inicial</th>
            <th className="tabla-interes-titulo-columna">Interés</th>
            <th className="tabla-interes-titulo-columna">Capital Final</th>
            <th className="tabla-interes-titulo-columna">Tasa Efectiva</th>
          </tr>
        </thead>
        <tbody>
          {[...Array(cantidadPeriodos).keys()].map(periodo => {
            const fila = calcularFila(periodo + 1, capitalAnterior);
            capitalAnterior = fila.capitalFinal; // Actualizamos el "capital anterior" para el próximo ciclo
            const esMultiploDe12 = (periodo + 1) % 12 === 0;
            const trClasses = `tr-hover ${
              esMultiploDe12 ? "tr-multiplo-de-12" : ""
            }`;
            return (
              <tr key={periodo} className={trClasses}>
                <td className="tabla-interes-filas">{periodo + 1}</td>
                <td className="tabla-interes-filas">
                  {formatearPesosArgentinos(fila.capitalInicial)}
                </td>
                <td className="tabla-interes-filas">
                  {formatearPesosArgentinos(fila.interesesPeriodo)}
                </td>
                <td className="tabla-interes-filas">
                  {formatearPesosArgentinos(fila.capitalFinal)}
                </td>
                <td className="tabla-interes-filas">
                  {(fila.rendimientoEfectivo * 100).toFixed(2)}%
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

// Validación de propiedades
TablaInteresCompuesto.propTypes = {
  capitalInicial: PropTypes.number.isRequired,
  tasaInteres: PropTypes.number.isRequired,
  cantidadPeriodos: PropTypes.number.isRequired,
};
