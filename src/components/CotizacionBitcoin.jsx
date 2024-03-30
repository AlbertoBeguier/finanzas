import { useState, useEffect } from "react";
import "../styles/CotizacionBitcoin.css";
export const CotizacionBitcoin = () => {
  const [cotizacion, setCotizacion] = useState({});

  useEffect(() => {
    const url = "https://api2.binance.com/api/v3/ticker/price?symbol=BTCUSDT";

    fetch(url)
      .then(response => response.json())
      .then(data => setCotizacion(data))
      .catch(error =>
        console.error("Error al obtener la cotización de Bitcoin:", error)
      );
  }, []);
  const formatPrice = price => {
    return parseFloat(price)
      .toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
      })
      .replace(/\./g, "X") // Reemplaza puntos por 'X' temporalmente.
      .replace(/,/g, ".") // Reemplaza comas por puntos.
      .replace(/X/g, ","); // Reemplaza 'X' por comas.
  };
  return (
    <div className="bitcoin-container">
      <h3 className="bitcoin-titulo">Cotización Bitcoin</h3>
      {cotizacion.price && (
        <p className="bitcoin-parrafo">{formatPrice(cotizacion.price)}</p>
      )}
    </div>
  );
};
