import { useEffect, useState } from "react";
import "../styles/InfoDolar.css";

export const InfoDolarAmbito = () => {
  const [dataDolar, setDataDolar] = useState(null);

  useEffect(() => {
    fetch("https://dolarapi.com/v1/ambito/dolares")
      .then(response => response.json())
      .then(data => {
        setDataDolar(data);
      })
      .catch(error => {
        console.error("Error fetching data: ", error);
      });
  }, []);

  return (
    <div>
      {dataDolar ? (
        <>
          <h3>Cotización Dólar (Ámbito Financiero) </h3>
          <table>
            <thead>
              <tr>
                <th style={{ textAlign: "left" }}>Tipo</th>
                <th style={{ textAlign: "center" }}>Compra</th>
                <th style={{ textAlign: "center" }}>Venta</th>
              </tr>
            </thead>
            <tbody>
              {dataDolar.map((item, index) => (
                <tr key={index}>
                  <td className="text-uppercase">{item.nombre}</td>
                  <td>
                    {new Intl.NumberFormat("es-AR", {
                      style: "currency",
                      currency: "ARS",
                    }).format(item.compra)}
                  </td>
                  <td>
                    {new Intl.NumberFormat("es-AR", {
                      style: "currency",
                      currency: "ARS",
                    }).format(item.venta)}
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
  );
};
