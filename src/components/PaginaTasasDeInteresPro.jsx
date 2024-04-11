import { useState, useEffect } from "react";
import "../styles/PaginaTasasDeInteresPro.css";

export function PaginaTasasDeInteresPro() {
  const [tasa, setTasa] = useState("");
  const [periodoTasaNominal, setPeriodoTasaNominal] = useState("Anual");
  const [tipoAnio, setTipoAnio] = useState("CivilExacto");
  const [numeroSubPeriodo, setNumeroSubPeriodo] = useState(1);
  const [unidadSubPeriodo, setUnidadSubPeriodo] = useState("Mes");
  const [numeroPlazoOperacion, setNumeroPlazoOperacion] = useState(12);
  const [textoPlazoOperacion, setTextoPlazoOperacion] = useState("Meses");
  const [tasaEquivalente, setTasaEquivalente] = useState(0);
  const [numeroSubPeriodo1, setNumeroSubPeriodo1] = useState(1);

  let unidadSubPeriodoPlural = unidadSubPeriodo;
  if (numeroSubPeriodo > 1) {
    if (unidadSubPeriodo === "Año") unidadSubPeriodoPlural = "Años";
    if (unidadSubPeriodo === "Mes") unidadSubPeriodoPlural = "Meses";
    if (unidadSubPeriodo === "Día") unidadSubPeriodoPlural = "Días";
  }

  useEffect(() => {
    const esPlural = numeroPlazoOperacion > 1;
    let textoBase = unidadSubPeriodo;

    if (unidadSubPeriodo === "Mes" && esPlural) {
      textoBase = "Meses";
    } else if (unidadSubPeriodo === "Meses" && !esPlural) {
      textoBase = "Mes";
    } else if (unidadSubPeriodo === "Día" && esPlural) {
      textoBase = "Días";
    } else if (unidadSubPeriodo === "Días" && !esPlural) {
      textoBase = "Día";
    } else if (unidadSubPeriodo === "Año" && esPlural) {
      textoBase = "Años";
    } else if (unidadSubPeriodo === "Años" && !esPlural) {
      textoBase = "Año";
    }
    setTextoPlazoOperacion(textoBase);
  }, [numeroSubPeriodo, unidadSubPeriodo, numeroPlazoOperacion]);

  useEffect(() => {
    if (unidadSubPeriodo === "Día") {
      setNumeroPlazoOperacion(tipoAnio === "CivilExacto" ? 365 : 360);
    } else if (unidadSubPeriodo === "Mes") {
      setNumeroPlazoOperacion(12);
    }
  }, [unidadSubPeriodo, tipoAnio]);

  const handleNumeroSubPeriodoChange = e => {
    setNumeroSubPeriodo(parseInt(e.target.value, 10) || 1);
  };

  const handleUnidadSubPeriodoChange = e => {
    setUnidadSubPeriodo(e.target.value);
  };

  const handleNumeroSubPeriodoChange1 = e => {
    setNumeroSubPeriodo1(parseInt(e.target.value, 10) || 1);
  };

  const handleNumeroPlazoOperacionChange = e => {
    setNumeroPlazoOperacion(parseInt(e.target.value, 10) || 1);
  };

  const convertirTasaADecimal = (tasa, periodoTasaNominal) => {
    switch (periodoTasaNominal) {
      case "Anual":
        return (tasa / 100).toFixed(2);
      case "Mensual":
        return (tasa / 100).toFixed(6);
      case "Diaria":
        return (tasa / 100).toFixed(8);
      default:
        return "";
    }
  };

  const obtenerAbreviatura = periodoTasaNominal => {
    switch (periodoTasaNominal) {
      case "Anual":
        return "TNA";
      case "Mensual":
        return "TNM";
      case "Diaria":
        return "TND";
      default:
        return "";
    }
  };

  const AnioExactoOComercial = tipoAnio === "CivilExacto" ? 365 : 360;

  const calcularTasaProporcional = () => {
    if (!tasa || !numeroSubPeriodo || !numeroPlazoOperacion) {
      return { tasaProporcional: 0, tasaProporcionalPorciento: 0 };
    }
    const tasaDecimal = parseFloat(tasa) / 100;
    const tasaProporcional =
      tasaDecimal * (numeroSubPeriodo / numeroPlazoOperacion);
    const tasaProporcionalPorciento = tasaProporcional * 100;
    return {
      tasaProporcional: tasaProporcional.toFixed(6),
      tasaProporcionalPorciento: tasaProporcionalPorciento.toFixed(2),
    };
  };

  const { tasaProporcional, tasaProporcionalPorciento } =
    calcularTasaProporcional();

  const calcularTasaEfectiva = () => {
    if (!tasaProporcional || !numeroSubPeriodo || !numeroPlazoOperacion) {
      return { tasaEfectiva: 0, tasaEfectivaPorciento: 0 };
    }
    const m = numeroPlazoOperacion / numeroSubPeriodo;
    const tasaEfectiva = Math.pow(1 + parseFloat(tasaProporcional), m) - 1;
    const tasaEfectivaPorciento = tasaEfectiva * 100;
    return {
      tasaEfectiva: tasaEfectiva.toFixed(6),
      tasaEfectivaPorciento: tasaEfectivaPorciento.toFixed(2),
    };
  };

  const { tasaEfectiva, tasaEfectivaPorciento } = calcularTasaEfectiva();

  useEffect(() => {
    const calcularTasaEquivalente = () => {
      if (tasaEfectiva && numeroSubPeriodo1) {
        // Asegúrate de que tasaEfectiva ya está en formato decimal para el cálculo
        const m = numeroPlazoOperacion / numeroSubPeriodo1;
        const te = Math.pow(1 + parseFloat(tasaEfectiva), 1 / m) - 1;
        setTasaEquivalente(te);
      }
    };

    calcularTasaEquivalente();
  }, [tasaEfectiva, numeroSubPeriodo1, numeroPlazoOperacion]);

  const verificarPlazoOperacion = () => {
    if (
      (periodoTasaNominal === "Anual" &&
        numeroSubPeriodo === 1 &&
        unidadSubPeriodo === "Mes" &&
        numeroPlazoOperacion !== 12) ||
      (unidadSubPeriodo === "Día" && ![360, 365].includes(numeroPlazoOperacion))
    ) {
      return "⚠ CUIDADO: Posible inconsistencia entre plazo y tasa !";
    }
    return "";
  };

  const advertenciaPlazoOperacion = verificarPlazoOperacion();

  return (
    <>
      <br />
      <h6 className="titulo-tasas-equivalentes">
        Cálculo de tasa proporcional y efectiva (Partiendo de una tasa nominal)
      </h6>
      <div className="container-fluid row">
        <div className="tasaContainer col-5">
          <div className="inputSection">
            <label className="label-tasa-nominal" htmlFor="periodicidad">
              Tasa Nominal
            </label>
            <select
              className="select-tasa-nominal"
              name="periodicidad"
              id="periodicidad"
              value={periodoTasaNominal}
              onChange={e => setPeriodoTasaNominal(e.target.value)}
            >
              <option value="Anual">Anual</option>
              <option value="Mensual">Mensual</option>
              <option value="Diaria">Diaria</option>
            </select>
            <div className="inputWithPercent">
              <input
                type="number"
                value={tasa}
                onChange={e => setTasa(e.target.value)}
                placeholder="%"
              />
              <span>%</span>
            </div>
          </div>
          {tasa && (
            <p className="resultado">
              {obtenerAbreviatura(periodoTasaNominal)} {tasa}% - - -{" "}
              {convertirTasaADecimal(tasa, periodoTasaNominal)}
            </p>
          )}
        </div>

        <div className="tipoAnioSection col-5">
          <label>
            <input
              type="radio"
              name="tipoAño"
              value="CivilExacto"
              checked={tipoAnio === "CivilExacto"}
              onChange={() => setTipoAnio("CivilExacto")}
            />
            Año Civil o Exacto
          </label>
          <label>
            <input
              type="radio"
              name="tipoAño"
              value="Comercial"
              checked={tipoAnio === "Comercial"}
              onChange={() => setTipoAnio("Comercial")}
            />
            Año Comercial
          </label>
          <span>{AnioExactoOComercial} días</span>
        </div>
      </div>
      <div className="container-fluid row">
        <div className="subPeriodoSection col-5">
          <label htmlFor="subPeriodo">
            Subperíodo de capitalización de intereses
          </label>
          <input
            className="subPeriodoInput"
            type="number"
            id="subPeriodo"
            value={numeroSubPeriodo}
            onChange={handleNumeroSubPeriodoChange}
            min="1"
          />
          <select
            className="select-tasa-nominal-10"
            value={unidadSubPeriodo}
            onChange={handleUnidadSubPeriodoChange}
          >
            {numeroSubPeriodo === 1 ? (
              <>
                <option className="option-tasa-interes" value="Año">
                  Año
                </option>
                <option value="Mes">Mes</option>
                <option value="Día">Día</option>
              </>
            ) : (
              <>
                <option value="Año">Años</option>
                <option value="Mes">Meses</option>
                <option value="Día">Días</option>
              </>
            )}
          </select>
        </div>

        <div className="subPeriodoSection col-5">
          <label htmlFor="PlazoOperacion">Plazo de la Operación</label>
          <input
            className="subPeriodoInput"
            type="number"
            id="PlazoOperacion"
            value={numeroPlazoOperacion}
            onChange={handleNumeroPlazoOperacionChange}
            min="1"
          />
          <span> {textoPlazoOperacion}</span>{" "}
          {advertenciaPlazoOperacion && (
            <span className="advertencia">{advertenciaPlazoOperacion}</span>
          )}
        </div>
      </div>
      <div>
        {tasa && (
          <div className="container-fluid row">
            <span className="parrafo-resultados col-10">
              🔵 Tasa Proporcional a {numeroSubPeriodo} {unidadSubPeriodoPlural}{" "}
              = {tasaProporcional} ---- {tasaProporcionalPorciento}%{" "}
              <span className="span-resultado">
                🔵 Tasa Efectiva a {numeroPlazoOperacion} {textoPlazoOperacion}{" "}
                = {tasaEfectiva} ---- {tasaEfectivaPorciento}%
              </span>
            </span>
          </div>
        )}
      </div>
      <hr />
      <h6 className="titulo-tasas-equivalentes">
        Cálculo de tasa equivalente (Partiendo de una tasa efectiva y un plazo)
      </h6>
      <div className="container-fluid row">
        <div className="subPeriodoSection col-10">
          <label htmlFor="subPeriodo">Subperíodo de cap de intereses</label>
          <input
            className="subPeriodoInput"
            type="number"
            id="subPeriodo"
            value={numeroSubPeriodo1}
            onChange={handleNumeroSubPeriodoChange1}
            min="1"
          />
          <span className="plazo-para-tasa-efectiva-1">
            {numeroSubPeriodo1 > 1
              ? unidadSubPeriodo === "Mes"
                ? "Meses"
                : unidadSubPeriodo === "Día"
                ? "Días"
                : unidadSubPeriodo === "Año"
                ? "Años"
                : unidadSubPeriodo // Default case, should not be needed but added for safety
              : unidadSubPeriodo}
          </span>
          <span className="plazo-para-tasa-efectiva">
            Plazo de la Operación: {numeroPlazoOperacion} {textoPlazoOperacion}
          </span>
          <span className="parrafo-resultados col-10">
            🔵 Tasa Equivalente a {numeroSubPeriodo1}{" "}
            {unidadSubPeriodo === "Año"
              ? numeroSubPeriodo1 > 1
                ? "Años"
                : "Año"
              : unidadSubPeriodo === "Mes"
              ? numeroSubPeriodo1 > 1
                ? "Meses"
                : "Mes"
              : numeroSubPeriodo1 > 1
              ? "Días"
              : "Día"}{" "}
            = {tasaEquivalente.toFixed(6)} ----{" "}
            {(tasaEquivalente * 100).toFixed(2)}%
          </span>
        </div>
      </div>
      <hr />
    </>
  );
}
