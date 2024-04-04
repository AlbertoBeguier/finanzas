/**
 * Calcula tasas equivalentes mensual y diaria para un array de tasas, con formatos específicos de decimales.
 * @param {Array} tasas - Array de objetos de tasas con la propiedad tnaClientes.
 * @return {Array} Array de objetos de tasas con tasas equivalentes mensual y diaria agregadas.
 */
export function calcularTasasEquivalentes(tasas) {
  return tasas.map(tasa => {
    const tnaDecimal = tasa.tnaClientes;
    // Asegurarse de que el cálculo y el formateo sean correctos
    const tasaMensual = tnaDecimal / 12;
    const tasaDiaria = tnaDecimal / 365; //Año comercial 360 días

    return {
      ...tasa,
      // Corregir el formateo para reflejar el resultado deseado
      tasaMensual: tasaMensual.toFixed(5), // Mantiene la precisión a cuatro decimales
      tasaDiaria: tasaDiaria.toFixed(7), // Ajuste para consistencia, si deseas seis decimales cambia a toFixed(6)
    };
  });
}
