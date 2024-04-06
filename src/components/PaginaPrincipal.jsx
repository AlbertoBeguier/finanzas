import { InfoDolar } from "./InfoDolar";
import { GraficoCotizacionDolarOficialMensual } from "./GraficoCotizacionDolarOficialMensual";
import { GraficoCotizacionDolarBlueMensual } from "./GraficoCotizacionDolarBlueMensual";
import { GraficoCotizacionDolarBolsaMensual } from "./GraficoCotizacionDolarBolsaMensual";
import { GraficoCotizacionDolarContadoConLiquiMensual } from "./GraficoCotizacionDolarContadoConLiquiMensual";

function PaginaPrincipal() {
  return (
    <div className="container-fluid">
      <InfoDolar />
      <GraficoCotizacionDolarOficialMensual />
      <GraficoCotizacionDolarBlueMensual />
      <GraficoCotizacionDolarBolsaMensual />
      <GraficoCotizacionDolarContadoConLiquiMensual />
    </div>
  );
}

export default PaginaPrincipal;
