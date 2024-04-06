import { GraficoInflacionMensual } from "./GraficoInflacionMensual";
import { GraficoInflacionAcumulada } from "./GraficoInflacionAcumulada";
import { GraficoInflacionInteranual } from "./GraficoInflacionInteranual";

import "../styles/Paginas.css";

export function PaginaInflacion() {
  return (
    <>
      <h3>Inflación </h3>
      <div className="margin-top-inflacion">
        <GraficoInflacionMensual />
        <GraficoInflacionAcumulada />
        <GraficoInflacionInteranual />
      </div>
    </>
  );
}
