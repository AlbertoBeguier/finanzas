import { useEffect, useState } from "react";
import "../styles/InfoDolar.css";
import Decimal from "decimal.js";

export const InfoDolar = () => {
  const [dataActual, setDataActual] = useState([]);
  const [datosHistoricos, setDatosHistoricos] = useState([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    // Función para cargar los datos actuales de las cotizaciones del dólar
    const cargarDatosActuales = async () => {
      const respuesta = await fetch("https://dolarapi.com/v1/dolares");
      const datos = await respuesta.json();
      setDataActual(datos);
    };

    // Función para cargar los datos históricos de las cotizaciones del dólar
    const cargarDatosHistoricos = async () => {
      const respuesta = await fetch(
        "https://api.argentinadatos.com/v1/cotizaciones/dolares"
      );
      const datos = await respuesta.json();
      setDatosHistoricos(datos);
    };

    // Ejecutar ambas cargas en paralelo y cambiar el estado de 'cargando' a false una vez completadas
    Promise.all([cargarDatosActuales(), cargarDatosHistoricos()]).then(() =>
      setCargando(false)
    );
  }, []);

  // Función para encontrar la cotización más reciente antes de una fecha dada para cada 'casa'
  const encontrarCotizacionAntesDeFecha = (casa, fecha) => {
    // Filtrar por 'casa' y ordenar por fecha de forma descendente
    const cotizaciones = datosHistoricos
      .filter(c => c.casa === casa && new Date(c.fecha) < fecha)
      .sort((a, b) => new Date(b.fecha) - new Date(a.fecha));

    // Retornar la cotización más reciente o undefined si no se encuentra ninguna
    return cotizaciones[0];
  };

  // Función para calcular las variaciones diaria y mensual
  const calcularVariaciones = () => {
    return dataActual.map(cotizacionActual => {
      const hoy = new Date();
      const ayer = new Date(hoy);
      ayer.setDate(ayer.getDate() - 1);
      const inicioMesActual = new Date(hoy.getFullYear(), hoy.getMonth(), 1); // Primer día del mes actual: 01/04/2024
      const finMesAnterior = new Date(inicioMesActual - 1); // Restamos un día para obtener el último día del mes anterior: 31/03/2024

      const cotizacionAyer = encontrarCotizacionAntesDeFecha(
        cotizacionActual.casa,
        ayer
      );
      const cotizacionFinMes = encontrarCotizacionAntesDeFecha(
        cotizacionActual.casa,
        finMesAnterior
      );

      // Calcular las variaciones si existen las cotizaciones para comparar
      const variacionDiariaCompra = cotizacionAyer
        ? new Decimal(cotizacionActual.compra)
            .minus(cotizacionAyer.compra)
            .dividedBy(cotizacionAyer.compra)
            .times(100)
            .toFixed(2)
        : "N/A";

      const variacionDiariaVenta = cotizacionAyer
        ? new Decimal(cotizacionActual.venta)
            .minus(cotizacionAyer.venta)
            .dividedBy(cotizacionAyer.venta)
            .times(100)
            .toFixed(2)
        : "N/A";

      const variacionMensualCompra = cotizacionFinMes
        ? new Decimal(cotizacionActual.compra)
            .minus(cotizacionFinMes.compra)
            .dividedBy(cotizacionFinMes.compra)
            .times(100)
            .toFixed(2)
        : "N/A";

      const variacionMensualVenta = cotizacionFinMes
        ? new Decimal(cotizacionActual.venta)
            .minus(cotizacionFinMes.venta)
            .dividedBy(cotizacionFinMes.venta)
            .times(100)
            .toFixed(2)
        : "N/A";
      return {
        ...cotizacionActual,
        variacionDiariaCompra,
        variacionDiariaVenta,
        variacionMensualCompra,
        variacionMensualVenta,
      };
    });
  };

  const datosConVariaciones = !cargando ? calcularVariaciones() : [];

  return (
    <div>
      {!cargando ? (
        <>
          <h3>Cotización Dólar</h3>
          <table>
            <thead>
              <tr>
                <th className="truco-columna"></th>
                <th className="truco-columna"></th>
                <th className="truco-columna"></th>
                <th className="truco-columna-1 group-header" colSpan="2">
                  Variación Diaria
                </th>
                <th className="truco-columna-1 group-header" colSpan="2">
                  Variación Mensual
                </th>
              </tr>
              <tr>
                <th>Tipo</th>
                <th className="tit-col">Compra</th>
                <th className="tit-col">Venta</th>
                <th className="truco-columna-1">Compra</th>
                <th className="truco-columna-1">Venta</th>
                <th className="truco-columna-1">Compra</th>
                <th className="truco-columna-1">Venta</th>
              </tr>
            </thead>
            <tbody>
              {datosConVariaciones.map((item, index) => (
                <tr key={index}>
                  <td className="tipo-dolar">{item.nombre.toUpperCase()}</td>
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
                  <td
                    style={{
                      color:
                        item.variacionDiariaCompra !== "N/A" &&
                        item.variacionDiariaCompra >= 0
                          ? "green"
                          : "red",
                    }}
                  >
                    {item.variacionDiariaCompra}%
                  </td>
                  <td
                    style={{
                      color:
                        item.variacionDiariaVenta !== "N/A" &&
                        item.variacionDiariaVenta >= 0
                          ? "green"
                          : "red",
                    }}
                  >
                    {item.variacionDiariaVenta}%
                  </td>
                  <td
                    style={{
                      color:
                        item.variacionMensualCompra !== "N/A" &&
                        item.variacionMensualCompra >= 0
                          ? "green"
                          : "red",
                    }}
                  >
                    {item.variacionMensualCompra}%
                  </td>
                  <td
                    style={{
                      color:
                        item.variacionMensualVenta !== "N/A" &&
                        item.variacionMensualVenta >= 0
                          ? "green"
                          : "red",
                    }}
                  >
                    {item.variacionMensualVenta}%
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
