import { useFormatPesosArgentinos } from "../hooks/useFormatPesosArgentinos";
import { useTiempoDeLaOperacion } from "../hooks/useTiempoDeLaOperacion";
import { useTasaInteres } from "../hooks/useTasaInteres";
import { TablaInteresSimple } from "./TablaInteresSimple";
import "../styles/InteresSimpleyCompuesto.css";

export const InteresSimple = () => {
  const [capitalInicial, handleChangeInicial, capitalInicialFormateado] =
    useFormatPesosArgentinos();
  const [capitalFinal, handleChangeFinal, capitalFinalFormateado] =
    useFormatPesosArgentinos();
  const [interesPeriodico, handleChangeInteres, interesPeriodicoFormateado] =
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

  // Verificar si todos los datos requeridos están presentes
  const datosCompletos = capitalInicial && tasa && cantidadTiempo;

  const calcularVariableFaltante = () => {
    const Co = parseFloat(capitalInicial) || null;
    const Cn = parseFloat(capitalFinal) || null;
    const I = parseFloat(interesPeriodico) || null;
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
    } else if (I !== null && i !== null && n !== null) {
      // Nuevo caso para calcular Co utilizando I, i y n
      const CoCalculado = I / (i * n);
      resultado = `Capital inicial calculado usando Interés: ${new Intl.NumberFormat(
        "es-AR",
        {
          style: "currency",
          currency: "ARS",
        }
      ).format(CoCalculado)}`;
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
    } else {
      resultado =
        "Se requieren todos los datos excepto uno para calcular el resultado.";
    }

    return resultado;
  };

  const resultadoCalculo = calcularVariableFaltante();

  return (
    <>
      <div className="contenedor-interes">
        <h3 className="titulo-interes">Interés Simple</h3>
        <div>
          <label className="label-interes">
            Capital Inicial:
            <input
              className="input-interes"
              name="name-input-interes"
              type="text"
              value={capitalInicial}
              onChange={handleChangeInicial}
            />
          </label>
          <span className="span-interes">{capitalInicialFormateado}</span>
        </div>

        <div>
          <label className="label-interes">
            Unidad de Tiempo:
            <select
              className="select-interes"
              name="name-select-interes"
              value={unidadTiempo}
              onChange={handleUnidadTiempoChange}
            >
              <option value="día">Día</option>
              <option value="mes">Mes</option>
              <option value="año">Año</option>
            </select>
          </label>
        </div>
        <div>
          <label className="label-interes">
            Cantidad de{" "}
            {unidadTiempo === "día"
              ? cantidadTiempo === "1"
                ? "Día"
                : "Días"
              : unidadTiempo === "mes"
              ? cantidadTiempo === "1"
                ? "Mes"
                : "Meses"
              : cantidadTiempo === "1"
              ? "Año"
              : "Años"}
            :
            <input
              className="input-interes-1"
              name="name-input-interes-1"
              type="number"
              min="1"
              value={cantidadTiempo}
              onChange={handleCantidadTiempoChange}
            />
          </label>
          <span className="span-interes">{renderizarTiempo()}</span>
        </div>

        <div>
          <label className="label-interes">
            Tasa de Interés:
            <input
              className="input-interes-2"
              name="name-input-interes-2"
              type="text"
              value={tasa}
              onChange={handleChangeTasa}
            />
          </label>
          {mensajeError && <span style={{ color: "red" }}>{mensajeError}</span>}
          <span className="span-interes">{tasaEnPorcentaje}</span>
        </div>
        <div>
          <label className="label-interes">
            Capital Final:
            <input
              className="input-interes"
              name="name-input-interes"
              type="text"
              value={capitalFinal}
              onChange={handleChangeFinal}
            />
          </label>
          <span className="span-interes">{capitalFinalFormateado}</span>
        </div>

        <div>
          <hr />
          <p>
            Calcular capital necesario para obtener cuota -- Ingresar: Cuota y
            tasa de interés
          </p>
          <label className="label-interes">
            Interés (Cuota)
            <input
              className="input-interes"
              name="name-input-interes"
              type="text"
              value={interesPeriodico}
              onChange={handleChangeInteres}
            />
          </label>
          <span className="span-interes">{interesPeriodicoFormateado}</span>
        </div>
        <hr />
        {resultadoCalculo && (
          <div>
            <strong>Resultado:</strong>{" "}
            <div className="span-interes-1">{resultadoCalculo}</div>
          </div>
        )}
      </div>

      <div className="contenedor-tabla">
        {datosCompletos && (
          <TablaInteresSimple
            capitalInicial={parseFloat(capitalInicial)}
            tasaInteres={parseFloat(tasa)}
            cantidadPeriodos={parseFloat(cantidadTiempo)}
          />
        )}
      </div>
    </>
  );
};
