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

  const handleNumeroSubPeriodoChange = e => {
    setNumeroSubPeriodo(parseInt(e.target.value, 10) || 1);
  };

  const handleUnidadSubPeriodoChange = e => {
    setUnidadSubPeriodo(e.target.value);
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

  return (
    <>
      <div className="tasaContainer">
        <div className="inputSection">
          <label htmlFor="periodicidad">Tasa Nominal</label>
          <select
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
            Tasa Nominal {periodoTasaNominal} {tasa}% —{" "}
            {obtenerAbreviatura(periodoTasaNominal)}{" "}
            {convertirTasaADecimal(tasa, periodoTasaNominal)}
          </p>
        )}
      </div>

      <div className="tipoAnioSection">
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

      <div className="subPeriodoSection">
        <label htmlFor="subPeriodo">
          Sub Período de Capitalización de intereses
        </label>
        <input
          type="number"
          id="subPeriodo"
          value={numeroSubPeriodo}
          onChange={handleNumeroSubPeriodoChange}
          min="1"
        />
        <select
          value={unidadSubPeriodo}
          onChange={handleUnidadSubPeriodoChange}
        >
          {numeroSubPeriodo === 1 ? (
            <>
              <option value="Año">Año</option>
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

      <div className="subPeriodoSection">
        <label htmlFor="PlazoOperacion">Plazo de la Operación</label>
        <input
          type="number"
          id="PlazoOperacion"
          value={numeroPlazoOperacion}
          onChange={handleNumeroPlazoOperacionChange}
          min="1"
        />
        <span> {textoPlazoOperacion}</span>
      </div>

      <p>INTERÉS SIMPLE</p>
      <div>
        {tasa && (
          <p>
            Tasa Proporcional (Efectiva) a {numeroSubPeriodo}{" "}
            {unidadSubPeriodoPlural} = {tasaProporcional} ----{" "}
            {tasaProporcionalPorciento}%
          </p>
        )}
      </div>
    </>
  );
}
