import { TasasPlazoFijo } from "./TasasPlazoFijo";

import { GraficoCotizacionPlazoFijoBCRA } from "./GraficoCotizacionPlazoFijoBCRA ";
import { TasaDeInteresNominal } from "./TasaDeInteresNominal";
import { InteresSimple } from "./InteresSimple";
import { InteresCompuesto } from "./InteresCompuesto";

export function PaginaTasasInteres() {
  return (
    <div className="container-fluid">
      <div className="row justify-content-center">
        <div className="col-9">
          <TasasPlazoFijo />
        </div>
      </div>
      <div className="container-fluid">
        <div className="p-3 border bg-light rounded ">
          <div className="row justify-content-center">
            <div className="col-12">
              <GraficoCotizacionPlazoFijoBCRA />
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
