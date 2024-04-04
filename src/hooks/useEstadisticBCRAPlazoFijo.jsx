import { useState, useEffect } from "react";

export function useEstadisticBCRAPlazoFijo() {
  const [tasasPorMes, setTasasPorMes] = useState({});
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://api.argentinadatos.com/v1/finanzas/tasas/depositos30Dias"
        );
        if (!response.ok) {
          throw new Error("La solicitud a la API falló");
        }

        const datos = await response.json();
        const datosProcesados = procesarDatos(datos);
        setTasasPorMes(datosProcesados);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return { tasasPorMes, error, isLoading };
}

// Función para procesar los datos y agruparlos por mes, excluyendo el mes actual
function procesarDatos(datos) {
  const mesActual = new Date().toISOString().slice(0, 7); // Formato AAAA-MM
  const tasasPorMes = datos.reduce((acumulador, { fecha, valor }) => {
    const mes = fecha.slice(0, 7); // Obtiene el AAAA-MM de la fecha

    if (mes !== mesActual) {
      // Excluye el mes actual
      if (!acumulador[mes]) {
        acumulador[mes] = [];
      }
      acumulador[mes].push(valor);
    }

    return acumulador;
  }, {});

  return tasasPorMes;
}
