import { useState, useEffect } from "react";

export function useEstadisticBCRAPlazoFijo() {
  const [cotizaciones, setCotizaciones] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://api.estadisticasbcra.com/api/tasa_depositos_30_dias",
          {
            method: "GET",
            headers: {
              Authorization:
                "BEARER eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3NDM3Njg4MzUsInR5cGUiOiJleHRlcm5hbCIsInVzZXIiOiJhYWJlZ3VpZXJAaG90bWFpbC5jb20ifQ.YF00kDQ75v7KO0cmEgltmYyWSDr-j1laK_pXyJC11yqV7wisfgw6hJGcDHGPZ9QKD8Q0TmjfVAuxPg8TkdJlwg",
            },
          }
        );

        if (!response.ok) {
          throw new Error("La solicitud a la API del BCRA falló");
        }

        const datos = await response.json();
        setCotizaciones(datos);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return { cotizaciones, error, isLoading };
}
