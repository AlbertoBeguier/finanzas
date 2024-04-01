import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { NavBar } from "./components/NavBar";
import { Footer } from "./components/Footer";
import { InfoDolar } from "./components/InfoDolar";
import { InfoDolarAmbito } from "./components/InfoDolarAmbito";
import { GraficoCotizacionDolarOficialMensual } from "./components/GraficoCotizacionDolarOficialMensual";
import { GraficoCotizacionDolarBlueMensual } from "./components/GraficoCotizacionDolarBlueMensual";
import { GraficoCotizacionDolarBolsaMensual } from "./components/GraficoCotizacionDolarBolsaMensual";
import { GraficoCotizacionDolarContadoConLiquiMensual } from "./components/GraficoCotizacionDolarContadoConLiquiMensual";
import { TasasPlazoFijo } from "./components/TasasPlazoFijo";
import { GraficoInflacionMensual } from "./components/GraficoInflacionMensual";
import { GraficoInflacionAcumulada } from "./components/GraficoInflacionAcumulada";
import { CotizacionBitcoin } from "./components/CotizacionBitcoin";
import { GraficoInflacionInteranual } from "./components/GraficoInflacionInteranual";

function App() {
  return (
    <>
      <NavBar />
      {/* Envolver los componentes en un contenedor y una fila de Bootstrap */}
      <div className="container">
        {" "}
        {/* Usa "container-fluid" si prefieres un ancho completo */}
        <div className="row">
          <div className="col-md-6">
            <InfoDolar />
          </div>
          <div className="col-md-6">
            <InfoDolarAmbito />
          </div>
        </div>
        <br />
        <hr />
      </div>
      <GraficoCotizacionDolarOficialMensual />
      <GraficoCotizacionDolarBlueMensual />
      <GraficoCotizacionDolarBolsaMensual />
      <GraficoCotizacionDolarContadoConLiquiMensual />
      <TasasPlazoFijo />
      <GraficoInflacionMensual />
      <GraficoInflacionAcumulada />
      <GraficoInflacionInteranual />
      <CotizacionBitcoin />
      <Footer />
    </>
  );
}

export default App;
