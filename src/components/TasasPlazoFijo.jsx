import { useEffect, useState } from "react";
import "../styles/TasasPlazoFijo.css";
import { calcularTasasEquivalentes } from "../utilities/calcularTasasEquivalentes";

export const TasasPlazoFijo = () => {
  const [dataTasas, setDataTasas] = useState({
    tasas: null,
    maxTNA: null,
    minTNA: null,
  });

  useEffect(() => {
    fetch("https://api.argentinadatos.com/v1/finanzas/tasas/plazoFijo")
      .then(response => response.json())
      .then(data => {
        if (data && data.length > 0) {
          // Suponiendo que tnaClientes ya es un número, si no, primero convierte los valores
          const maxTNA = Math.max(...data.map(tasa => tasa.tnaClientes));
          const minTNA = Math.min(...data.map(tasa => tasa.tnaClientes));
          setDataTasas({ tasas: data, maxTNA, minTNA });
          const tasasConEquivalentes = calcularTasasEquivalentes(data);
          setDataTasas({ tasas: tasasConEquivalentes, maxTNA, minTNA });
        }
      })
      .catch(error => {
        console.error("Error fetching data: ", error);
      });
  }, []);

  return (
    <>
      <div>
        {dataTasas.tasas ? (
          <>
            <h3>Tasas Plazos Fijos reportadas al BCRA</h3>
            <p className="parrafo-p-fijo">
              Las tasas son reportadas por los bancos al BCRA en cumplimiento
              del Régimen Informativo de Transparencia.
            </p>
            <table>
              <thead>
                <tr>
                  <th style={{ textAlign: "left" }}>ENTIDAD FINANCIERA</th>
                  <th style={{ textAlign: "center" }}>TNA </th>
                  <th style={{ textAlign: "center" }}>TEfM</th>
                  <th style={{ textAlign: "center" }}>TEfD</th>
                </tr>
              </thead>
              <tbody className="tabla-plazo-fijo">
                {dataTasas.tasas.map((tasa, index) => (
                  <tr
                    key={index}
                    className={
                      tasa.tnaClientes === dataTasas.maxTNA
                        ? "fila-maxima"
                        : tasa.tnaClientes === dataTasas.minTNA
                        ? "fila-minima"
                        : ""
                    }
                  >
                    <td className="td-p-f">{tasa.entidad}</td>

                    <td className="td-p-f-1" style={{ textAlign: "center" }}>
                      {tasa.tnaClientes.toFixed(2)}
                    </td>
                    <td className="td-p-f-1" style={{ textAlign: "center" }}>
                      {tasa.tasaMensual}
                    </td>
                    <td className="td-p-f-1" style={{ textAlign: "center" }}>
                      {tasa.tasaDiaria}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        ) : (
          <div className="loading-container">
            <div className="spinner"></div>
            <span className="texto-spinner">Cargando datos...</span>
          </div>
        )}
      </div>
    </>
  );
};
