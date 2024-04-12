import { InfoDolar } from "./InfoDolar";
import { GraficoCotizacionDolarOficialMensual } from "./GraficoCotizacionDolarOficialMensual";
import { GraficoCotizacionDolarBlueMensual } from "./GraficoCotizacionDolarBlueMensual";
import { GraficoCotizacionDolarBolsaMensual } from "./GraficoCotizacionDolarBolsaMensual";
import { GraficoCotizacionDolarContadoConLiquiMensual } from "./GraficoCotizacionDolarContadoConLiquiMensual";

function PaginaPrincipal() {
  return (
    <div className="container-fluid">
      <div className="container-fluid row">
        <div className="col-10">
          <InfoDolar />
        </div>
      </div>
      <GraficoCotizacionDolarOficialMensual />
      <GraficoCotizacionDolarBlueMensual />
      <GraficoCotizacionDolarBolsaMensual />
      <GraficoCotizacionDolarContadoConLiquiMensual />
    </div>
  );
}

export default PaginaPrincipal;
