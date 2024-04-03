import { useState, useEffect } from "react";
import "../styles/CotizacionBitcoin.css";
import Decimal from "decimal.js";

export const CotizacionBitcoin = () => {
  // Estado para Bitcoin
  const [cotizacionActualBTC, setCotizacionActualBTC] = useState(null);
  const [variacionDiariaBTC, setVariacionDiariaBTC] = useState(null);
  const [variacionMensualBTC, setVariacionMensualBTC] = useState(null);
  const [variacionAnualBTC, setVariacionAnualBTC] = useState(null);

  // Estado para Ethereum
  const [cotizacionActualETH, setCotizacionActualETH] = useState(null);
  const [variacionDiariaETH, setVariacionDiariaETH] = useState(null);
  const [variacionMensualETH, setVariacionMensualETH] = useState(null);
  const [variacionAnualETH, setVariacionAnualETH] = useState(null);

  useEffect(() => {
    const fetchData = async coin => {
      try {
        const today = new Date();
        const oneYearAgo = new Date(today);
        oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);
        const lastMonth = new Date(today);
        lastMonth.setMonth(lastMonth.getMonth() - 1);

        const fromUnixTimestamp = Math.floor(oneYearAgo.getTime() / 1000);
        const toUnixTimestamp = Math.floor(today.getTime() / 1000);

        const url = `https://api.coingecko.com/api/v3/coins/${coin}/market_chart/range?vs_currency=usd&from=${fromUnixTimestamp}&to=${toUnixTimestamp}`;
        const response = await fetch(url);
        const data = await response.json();

        const prices = data.prices;
        const priceOneYearAgo = prices[0][1];
        const currentPrice = prices[prices.length - 1][1];

        // Encuentra el último día del mes anterior dentro de los datos
        const lastMonthPriceData = prices.find(price => {
          const date = new Date(price[0]);
          return (
            date.getMonth() === lastMonth.getMonth() &&
            date.getFullYear() === lastMonth.getFullYear()
          );
        });
        const lastMonthPrice = lastMonthPriceData
          ? lastMonthPriceData[1]
          : null;

        // Calcula las variaciones
        const yesterdayPrice = prices[prices.length - 2][1];
        const dailyVariation = new Decimal(currentPrice)
          .minus(new Decimal(yesterdayPrice))
          .dividedBy(new Decimal(yesterdayPrice))
          .times(100);
        const monthlyVariation = lastMonthPrice
          ? new Decimal(currentPrice)
              .minus(new Decimal(lastMonthPrice))
              .dividedBy(new Decimal(lastMonthPrice))
              .times(100)
          : new Decimal(0);

        const annualVariation = new Decimal(currentPrice)
          .minus(new Decimal(priceOneYearAgo))
          .dividedBy(new Decimal(priceOneYearAgo))
          .times(100);

        // Asigna los valores al estado correspondiente
        if (coin === "bitcoin") {
          setCotizacionActualBTC(currentPrice);
          setVariacionDiariaBTC(dailyVariation);
          setVariacionMensualBTC(monthlyVariation);
          setVariacionAnualBTC(annualVariation);
        } else if (coin === "ethereum") {
          setCotizacionActualETH(currentPrice);
          setVariacionDiariaETH(dailyVariation);
          setVariacionMensualETH(monthlyVariation);
          setVariacionAnualETH(annualVariation);
        }
      } catch (error) {
        console.error(`Error al obtener la cotización de ${coin}:`, error);
      }
    };

    fetchData("bitcoin");
    fetchData("ethereum");
  }, []);

  const formatPrice = price => {
    return parseFloat(price).toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
    });
  };

  const formatVariacion = variacion => {
    return variacion ? variacion.toFixed(2) + "%" : "N/A"; // `variacion` ya es una instancia de Decimal aquí
  };

  const getColorClass = value => {
    return value < 0 ? "red" : "green";
  };

  return (
    <div>
      <h3 className="bitcoin-titulo">Cotización Bitcoin y Ethereum</h3>
      {!cotizacionActualBTC || !cotizacionActualETH ? (
        <div className="loading-container">
          <div className="spinner"></div>
          <span className="texto-spinner">Cargando datos...</span>
        </div>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Criptomoneda</th>
              <th>Valor actual</th>
              <th>Var diaria</th>
              <th>Var mensual</th>
              <th>Var anual</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="bitcoin-parrafo">Bitcoin (BTC)</td>
              <td>
                <span className="bitcoin-parrafo">
                  {cotizacionActualBTC
                    ? formatPrice(cotizacionActualBTC)
                    : "N/A"}
                </span>
              </td>
              <td>
                <span
                  className={`bitcoin-parrafo ${getColorClass(
                    variacionDiariaBTC
                  )}`}
                >
                  {formatVariacion(variacionDiariaBTC)}
                </span>
              </td>
              <td>
                <span
                  className={`bitcoin-parrafo ${getColorClass(
                    variacionMensualBTC
                  )}`}
                >
                  {formatVariacion(variacionMensualBTC)}
                </span>
              </td>
              <td>
                <span
                  className={`bitcoin-parrafo ${getColorClass(
                    variacionAnualBTC
                  )}`}
                >
                  {formatVariacion(variacionAnualBTC)}
                </span>
              </td>
            </tr>
            <tr>
              <td className="bitcoin-parrafo">Ethereum (ETH)</td>
              <td>
                <span className="bitcoin-parrafo">
                  {cotizacionActualETH
                    ? formatPrice(cotizacionActualETH)
                    : "N/A"}
                </span>
              </td>
              <td>
                <span
                  className={`bitcoin-parrafo ${getColorClass(
                    variacionDiariaETH
                  )}`}
                >
                  {formatVariacion(variacionDiariaETH)}
                </span>
              </td>
              <td>
                <span
                  className={`bitcoin-parrafo ${getColorClass(
                    variacionMensualETH
                  )}`}
                >
                  {formatVariacion(variacionMensualETH)}
                </span>
              </td>
              <td>
                <span
                  className={`bitcoin-parrafo ${getColorClass(
                    variacionAnualETH
                  )}`}
                >
                  {formatVariacion(variacionAnualETH)}
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      )}
    </div>
  );
};
