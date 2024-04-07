import { InfoDolar } from "./InfoDolar";
import { GraficoCotizacionDolarOficialMensual } from "./GraficoCotizacionDolarOficialMensual";
import { GraficoCotizacionDolarBlueMensual } from "./GraficoCotizacionDolarBlueMensual";
import { GraficoCotizacionDolarBolsaMensual } from "./GraficoCotizacionDolarBolsaMensual";
import { GraficoCotizacionDolarContadoConLiquiMensual } from "./GraficoCotizacionDolarContadoConLiquiMensual";
import { GraficoInflacionMensual } from "./GraficoInflacionMensual";
import { GraficoInflacionInteranual } from "./GraficoInflacionInteranual";
import { GraficoInflacionAcumulada } from "./GraficoInflacionAcumulada";
import { InteresSimple } from "./InteresSimple";
import { TasaDeInteresNominal } from "./TasaDeInteresNominal";
import { InteresCompuesto } from "./InteresCompuesto";
import { GraficoCotizacionPlazoFijoBCRA } from "./GraficoCotizacionPlazoFijoBCRA ";

export function PaginaAnalisis() {
  return (
    <div className="container-fluid">
      <InfoDolar />
      <GraficoCotizacionDolarOficialMensual />
      <GraficoCotizacionDolarBlueMensual />
      <GraficoCotizacionDolarBolsaMensual />
      <GraficoCotizacionDolarContadoConLiquiMensual />
      <GraficoInflacionMensual />
      <GraficoInflacionInteranual />
      <GraficoInflacionAcumulada />
      <GraficoCotizacionPlazoFijoBCRA />
      <br />
      <div className="container-fluid">
        <div className="p-3 border bg-light rounded ">
          <div className="row justify-content-center">
            <div className="col-4">
              <TasaDeInteresNominal />
            </div>
            <div className="col-6">
              <InteresSimple />
            </div>
          </div>
        </div>
      </div>
      <br />
      <div className="container-fluid">
        <div className="p-3 border bg-light rounded ">
          <div className="row justify-content-center">
            <div className="col-4">
              <TasaDeInteresNominal />
            </div>
            <div className="col-6">
              <InteresCompuesto />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
