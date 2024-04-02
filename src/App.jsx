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
// ------------------------------------------ //

// interes simple y compuesto

import { TasaDeInteresNominal } from "./components/TasaDeInteresNominal";
import { InteresSimple } from "./components/InteresSimple";
import { InteresCompuesto } from "./components/InteresCompuesto";

function App() {
  return (
    <>
      <NavBar />
      <br />
      <br />
      <div className="container">
        {" "}
        {/* Usa "container-fluid" si prefieres un ancho completo */}
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="p-3 border bg-light rounded ">
              <InfoDolar />
            </div>
          </div>

          <div className="col-md-6">
            <div className="p-3 border bg-light rounded ">
              <InfoDolarAmbito />
            </div>
          </div>
        </div>
      </div>
      <GraficoCotizacionDolarOficialMensual />
      <GraficoCotizacionDolarBlueMensual />
      <GraficoCotizacionDolarBolsaMensual />
      <GraficoCotizacionDolarContadoConLiquiMensual />
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-9">
            <div className="p-3 border bg-light rounded ">
              <TasasPlazoFijo />
            </div>
          </div>
        </div>
      </div>
      <br />
      <GraficoInflacionMensual />
      <GraficoInflacionAcumulada />
      <GraficoInflacionInteranual />
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="p-3 border bg-light rounded ">
              <CotizacionBitcoin />
            </div>
          </div>
        </div>
      </div>
      <br />
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="p-3 border bg-light rounded ">
              <TasaDeInteresNominal />
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="p-3 border bg-light rounded ">
          <div className="row justify-content-center">
            <div className="col-md-6">
              <InteresSimple />
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="p-3 border bg-light rounded ">
              <InteresCompuesto />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default App;
