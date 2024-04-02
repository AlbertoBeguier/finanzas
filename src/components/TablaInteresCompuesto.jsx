import PropTypes from "prop-types";

// Componente de Tabla de Interés Compuesto
export const TablaInteresCompuesto = ({
  capitalInicial,
  tasaInteres,
  cantidadPeriodos,
}) => {
  // Función para calcular los valores de cada fila de la tabla
  const calcularFila = (periodo, capitalAnterior) => {
    const tasa = tasaInteres;
    const capitalFinalPeriodo = capitalAnterior * Math.pow(1 + tasa, 1); // Siempre calculamos para un período
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
      <h3>Tabla de Interés Compuesto</h3>
      <table>
        <thead>
          <tr>
            <th>Período</th>
            <th>Capital Inicial</th>
            <th>Interés </th>
            <th>Capital Final</th>
            <th>Rendimiento Efectivo</th>
          </tr>
        </thead>
        <tbody>
          {[...Array(cantidadPeriodos).keys()].map(periodo => {
            const fila = calcularFila(periodo + 1, capitalAnterior);
            capitalAnterior = fila.capitalFinal; // Actualizamos el "capital anterior" para el próximo ciclo
            return (
              <tr key={periodo}>
                <td>{periodo + 1}</td>
                <td>{formatearPesosArgentinos(fila.capitalInicial)}</td>
                <td>{formatearPesosArgentinos(fila.interesesPeriodo)}</td>
                <td>{formatearPesosArgentinos(fila.capitalFinal)}</td>
                <td>{(fila.rendimientoEfectivo * 100).toFixed(2)} %</td>
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
