import { InfoDolar } from "./InfoDolar";
import { GraficoCotizacionDolarOficialMensual } from "./GraficoCotizacionDolarOficialMensual";
import { GraficoCotizacionDolarBlueMensual } from "./GraficoCotizacionDolarBlueMensual";
import { GraficoCotizacionDolarBolsaMensual } from "./GraficoCotizacionDolarBolsaMensual";
import { GraficoCotizacionDolarContadoConLiquiMensual } from "./GraficoCotizacionDolarContadoConLiquiMensual";
import { Enlaces } from "./Enlaces";

function PaginaPrincipal() {
  return (
    <div className="container-fluid">
      <div className="row ">
        <div className="col-1 enlaces-container align-items-center">
          <Enlaces />
        </div>
        <div className="col-11">
          <InfoDolar />
          <GraficoCotizacionDolarOficialMensual />
          <GraficoCotizacionDolarBlueMensual />
          <GraficoCotizacionDolarBolsaMensual />
          <GraficoCotizacionDolarContadoConLiquiMensual />
        </div>
      </div>
    </div>
  );
}

export default PaginaPrincipal;
