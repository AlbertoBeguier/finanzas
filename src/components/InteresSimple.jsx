import { useFormatPesosArgentinos } from "../hooks/useFormatPesosArgentinos";
import { useTiempoDeLaOperacion } from "../hooks/useTiempoDeLaOperacion";
import { useTasaInteres } from "../hooks/useTasaInteres";

export const InteresSimple = () => {
  const [capitalInicial, handleChangeInicial, capitalInicialFormateado] =
    useFormatPesosArgentinos();
  const [capitalFinal, handleChangeFinal, capitalFinalFormateado] =
    useFormatPesosArgentinos();
  const [
    cantidadTiempo,
    unidadTiempo,
    handleCantidadTiempoChange,
    handleUnidadTiempoChange,
    renderizarTiempo,
  ] = useTiempoDeLaOperacion("1", "mes");
  const [tasa, handleChangeTasa, mensajeError, tasaEnPorcentaje] =
    useTasaInteres(unidadTiempo);

  const calcularVariableFaltante = () => {
    const Co = parseFloat(capitalInicial) || null;
    const Cn = parseFloat(capitalFinal) || null;
    const i = parseFloat(tasa) || null;
    const n = parseFloat(cantidadTiempo) || null;

    let resultado = "";
    let intereses = null;

    if (Co !== null && Cn === null && i !== null && n !== null) {
      const CnCalculado = Co * (1 + i * n);
      intereses = CnCalculado - Co;
      resultado = `Capital final: ${new Intl.NumberFormat("es-AR", {
        style: "currency",
        currency: "ARS",
      }).format(CnCalculado)}. Intereses: ${new Intl.NumberFormat("es-AR", {
        style: "currency",
        currency: "ARS",
      }).format(intereses)}`;
    } else if (Cn !== null && Co === null && i !== null && n !== null) {
      const CoCalculado = Cn / (1 + i * n);
      intereses = Cn - CoCalculado;
      resultado = `Capital inicial: ${new Intl.NumberFormat("es-AR", {
        style: "currency",
        currency: "ARS",
      }).format(CoCalculado)}. Intereses: ${new Intl.NumberFormat("es-AR", {
        style: "currency",
        currency: "ARS",
      }).format(intereses)}`;
    } else if (Co !== null && Cn !== null && i === null && n !== null) {
      const iCalculado = (Cn - Co) / (Co * n);
      intereses = Cn - Co;
      resultado = `Tasa de interés: ${(iCalculado * 100).toFixed(
        2
      )}%. Intereses: ${new Intl.NumberFormat("es-AR", {
        style: "currency",
        currency: "ARS",
      }).format(intereses)}`;
    } else if (Co !== null && Cn !== null && i !== null && n === null) {
      const nCalculado = (Cn / Co - 1) / i;
      intereses = Cn - Co;

      let unidadTiempoCorrecta;
      if (nCalculado === 1) {
        unidadTiempoCorrecta = unidadTiempo.endsWith("es")
          ? unidadTiempo.slice(0, -2)
          : unidadTiempo.slice(0, -1);
      } else {
        unidadTiempoCorrecta =
          unidadTiempo === "mes" ? "meses" : unidadTiempo + "s";
      }

      resultado = `Tiempo: ${nCalculado.toFixed(
        2
      )} ${unidadTiempoCorrecta}. Intereses: ${new Intl.NumberFormat("es-AR", {
        style: "currency",
        currency: "ARS",
      }).format(intereses)}`;
    }

    return resultado;
  };

  const resultadoCalculo = calcularVariableFaltante();

  return (
    <div>
      <h1>Interés Simple</h1>
      <div>
        <label>
          Capital Inicial:
          <input
            type="text"
            value={capitalInicial}
            onChange={handleChangeInicial}
          />
        </label>
        <span>{capitalInicialFormateado}</span>
      </div>
      <div>
        <label>
          Capital Final:
          <input
            type="text"
            value={capitalFinal}
            onChange={handleChangeFinal}
          />
        </label>
        <span>{capitalFinalFormateado}</span>
      </div>
      <div>
        <label>
          Unidad de Tiempo:
          <select value={unidadTiempo} onChange={handleUnidadTiempoChange}>
            <option value="día">Día</option>
            <option value="mes">Mes</option>
            <option value="año">Año</option>
          </select>
        </label>
        <span>{renderizarTiempo()}</span>
      </div>
      <div>
        <label>
          Cantidad de Tiempo:
          <input
            type="number"
            min="1"
            value={cantidadTiempo}
            onChange={handleCantidadTiempoChange}
          />
        </label>
      </div>

      <div>
        <label>
          Tasa de Interés:
          <input type="text" value={tasa} onChange={handleChangeTasa} />
        </label>
        {mensajeError && <span style={{ color: "red" }}>{mensajeError}</span>}
        <span>{tasaEnPorcentaje}</span>
      </div>
      {resultadoCalculo && (
        <div>
          <strong>Resultado:</strong> <span>{resultadoCalculo}</span>
        </div>
      )}
    </div>
  );
};
