import PropTypes from "prop-types";
import "../styles/InteresSimpleyCompuesto.css";
export const TablaInteresSimple = ({
  capitalInicial,
  tasaInteres,
  cantidadPeriodos,
}) => {
  // Función para calcular los valores de cada fila
  const calcularFila = periodo => {
    const interes = capitalInicial * tasaInteres;
    const capitalFinalPeriodo = capitalInicial + interes * periodo;
    const rendimientoEfectivo = (interes * periodo) / capitalInicial;
    return {
      periodo,
      capitalInicial,
      interes1: interes,
      interes: interes * periodo,
      capitalFinal: capitalFinalPeriodo,
      rendimientoEfectivo,
    };
  };

  return (
    <div>
      <h3>Tabla Interés Simple</h3>
      <table>
        <thead>
          <tr>
            <th>Período</th>
            <th>Capital Inicial</th>
            <th>Interés del período</th>
            <th>Interés Acumulado</th>
            <th>Capital Final </th>
            <th>Rendimiento Efectivo</th>
          </tr>
        </thead>
        <tbody>
          {[...Array(cantidadPeriodos).keys()].map((_, index) => {
            const fila = calcularFila(index + 1);
            const esMultiploDe12 = fila.periodo % 12 === 0;
            const trClasses = `tr-hover ${
              esMultiploDe12 ? "tr-multiplo-de-12" : ""
            }`;
            return (
              <tr key={index} className={trClasses}>
                <td>{fila.periodo}</td>
                <td>
                  {fila.capitalInicial.toLocaleString("es-AR", {
                    style: "currency",
                    currency: "ARS",
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </td>
                <td>
                  {fila.interes1.toLocaleString("es-AR", {
                    style: "currency",
                    currency: "ARS",
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </td>
                <td>
                  {fila.interes.toLocaleString("es-AR", {
                    style: "currency",
                    currency: "ARS",
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </td>
                <td>
                  {fila.capitalFinal.toLocaleString("es-AR", {
                    style: "currency",
                    currency: "ARS",
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </td>
                <td>{(fila.rendimientoEfectivo * 100).toFixed(2)}%</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

TablaInteresSimple.propTypes = {
  capitalInicial: PropTypes.number.isRequired,
  tasaInteres: PropTypes.number.isRequired,
  cantidadPeriodos: PropTypes.number.isRequired,
};
