import { useEffect } from "react";
import { useFormatPesosArgentinos } from "../hooks/useFormatPesosArgentinos";
import { useTiempoDeLaOperacion } from "../hooks/useTiempoDeLaOperacion";
import { useTasaInteres1 } from "../hooks/useTasaInteres1";
import { TablaInteresCompuestoIngEgr } from "./TablaInteresCompuestoIngEgr";
import "../styles/InteresSimpleyCompuesto.css";

export const InteresCompuestoIngEgr = () => {
  const [capitalInicial, handleChangeInicial, capitalInicialFormateado] =
    useFormatPesosArgentinos(sessionStorage.getItem("capitalInicial") || "");
  const [capitalFinal, handleChangeFinal, capitalFinalFormateado] =
    useFormatPesosArgentinos(sessionStorage.getItem("capitalFinal") || "");
  const [
    cantidadTiempo,
    periodoCapitalizacion,
    handleCantidadTiempoChange,
    handlePeriodoCapitalizacionChange,
    renderizarTiempo,
  ] = useTiempoDeLaOperacion(
    sessionStorage.getItem("cantidadTiempo") || "1",
    sessionStorage.getItem("periodoCapitalizacion") || "mes"
  );
  const [tasa1, handleChangeTasa, mensajeError, tasaEnPorcentaje] =
    useTasaInteres1(
      periodoCapitalizacion,
      sessionStorage.getItem("tasa1") || ""
    );

  useEffect(() => {
    sessionStorage.setItem("capitalInicial", capitalInicial);
    sessionStorage.setItem("capitalFinal", capitalFinal);
    sessionStorage.setItem("cantidadTiempo", cantidadTiempo);
    sessionStorage.setItem("periodoCapitalizacion", periodoCapitalizacion);
    sessionStorage.setItem("tasa1", tasa1);
  }, [
    capitalInicial,
    capitalFinal,
    cantidadTiempo,
    periodoCapitalizacion,
    tasa1,
  ]);

  // Verificar si todos los datos requeridos están presentes
  const datosCompletos = capitalInicial && tasa1 && cantidadTiempo;

  const calcularVariableFaltante = () => {
    const Co = parseFloat(capitalInicial) || null;
    const Cn = parseFloat(capitalFinal) || null;
    const i = parseFloat(tasa1) || null;
    const n = parseFloat(cantidadTiempo) || null;

    let resultado = "";
    let intereses = null;

    // Calcula el capital final si falta
    if (Co !== null && Cn === null && i !== null && n !== null) {
      const CnCalculado = Co * Math.pow(1 + i, n);
      intereses = CnCalculado - Co;
      resultado = `Capital final: ${new Intl.NumberFormat("es-AR", {
        style: "currency",
        currency: "ARS",
      }).format(CnCalculado)}. Intereses: ${new Intl.NumberFormat("es-AR", {
        style: "currency",
        currency: "ARS",
      }).format(intereses)}`;
      // Calcula el capital inicial si falta
    } else if (Cn !== null && Co === null && i !== null && n !== null) {
      const CoCalculado = Cn / Math.pow(1 + i, n);
      intereses = Cn - CoCalculado;
      resultado = `Capital inicial: ${new Intl.NumberFormat("es-AR", {
        style: "currency",
        currency: "ARS",
      }).format(CoCalculado)}. Intereses: ${new Intl.NumberFormat("es-AR", {
        style: "currency",
        currency: "ARS",
      }).format(intereses)}`;
      // Calcula la tasa de interés si falta
    } else if (Co !== null && Cn !== null && i === null && n !== null) {
      const iCalculado = Math.pow(Cn / Co, 1 / n) - 1;
      intereses = Cn - Co;
      resultado = `Tasa de interés: ${(iCalculado * 100).toFixed(
        2
      )}%. Intereses: ${new Intl.NumberFormat("es-AR", {
        style: "currency",
        currency: "ARS",
      }).format(intereses)}`;
      // Calcula la cantidad de tiempo si falta
    } else if (Co !== null && Cn !== null && i !== null && n === null) {
      const nCalculado = Math.log(Cn / Co) / Math.log(1 + i);
      intereses = Cn - Co;
      resultado = `Tiempo: ${nCalculado.toFixed(
        2
      )} ${periodoCapitalizacion}(es). Intereses: ${new Intl.NumberFormat(
        "es-AR",
        {
          style: "currency",
          currency: "ARS",
        }
      ).format(intereses)}`;
    } else {
      resultado =
        "Se requieren todos los datos excepto uno para calcular el resultado.";
    }

    return resultado;
  };

  const resultadoCalculo = calcularVariableFaltante();

  return (
    <>
      <div>
        <h3 className="tabla-interes-titulo">Interés Compuesto</h3>
        <div className="interes-compuesto-contenido">
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

        <div className="interes-compuesto-contenido">
          <label className="label-interes">
            Período de Capitalización:
            <select
              className="select-interes"
              name="name-select-interes"
              value={periodoCapitalizacion}
              onChange={handlePeriodoCapitalizacionChange}
            >
              <option value="día">Día</option>
              <option value="mes">Mes</option>
              <option value="año">Año</option>
            </select>
          </label>
        </div>

        <div className="interes-compuesto-contenido">
          <label className="label-interes">
            Cantidad de{" "}
            {periodoCapitalizacion === "día"
              ? cantidadTiempo === "1"
                ? "Día"
                : "Días"
              : periodoCapitalizacion === "mes"
              ? cantidadTiempo === "1"
                ? "Mes"
                : "Meses"
              : cantidadTiempo === "1"
              ? "Año"
              : "Años"}
            :
            <input
              className="input-interes-1"
              name="name-input-interes-1 "
              type="number"
              min="1"
              value={cantidadTiempo}
              onChange={handleCantidadTiempoChange}
            />
          </label>
          <span className="span-interes">{renderizarTiempo()}</span>
        </div>

        <div className="interes-compuesto-contenido">
          <label className="label-interes">
            Tasa de Interés :
            <input
              className="input-interes-2"
              name="name-input-interes-2"
              type="text"
              value={tasa1}
              onChange={handleChangeTasa}
            />
          </label>
          {mensajeError && <span style={{ color: "red" }}>{mensajeError}</span>}
          <span className="span-interes">{tasaEnPorcentaje}</span>
        </div>

        <div className="interes-compuesto-contenido">
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

        {resultadoCalculo && (
          <div>
            <strong>Resultado:</strong>
            <div className="span-interes-1">{resultadoCalculo}</div>
          </div>
        )}
      </div>
      <div>
        {datosCompletos && (
          <TablaInteresCompuestoIngEgr
            capitalInicial={parseFloat(capitalInicial)}
            tasaInteres={parseFloat(tasa1)}
            cantidadPeriodos={parseInt(cantidadTiempo)}
          />
        )}
      </div>
    </>
  );
};
