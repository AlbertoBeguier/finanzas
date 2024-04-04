import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { NavBar } from "./components/NavBar";
import { Footer } from "./components/Footer";
import { InfoDolar } from "./components/InfoDolar";
import { GraficoCotizacionDolarOficialMensual } from "./components/GraficoCotizacionDolarOficialMensual";
import { GraficoCotizacionDolarBlueMensual } from "./components/GraficoCotizacionDolarBlueMensual";
import { GraficoCotizacionDolarBolsaMensual } from "./components/GraficoCotizacionDolarBolsaMensual";
import { GraficoCotizacionDolarContadoConLiquiMensual } from "./components/GraficoCotizacionDolarContadoConLiquiMensual";
import { TasasPlazoFijo } from "./components/TasasPlazoFijo";
import { GraficoInflacionMensual } from "./components/GraficoInflacionMensual";
import { GraficoInflacionAcumulada } from "./components/GraficoInflacionAcumulada";
import { GraficoInflacionInteranual } from "./components/GraficoInflacionInteranual";
// ------------------------------------------ //

// Series estadísticas
import { GraficoCotizacionPlazoFijoBCRA } from "./components/GraficoCotizacionPlazoFijoBCRA ";

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
      <div className="container-fluid">
        {" "}
        {/* Usa "container-fluid" si prefieres un ancho completo */}
        <div className="row justify-content-center">
          <div className="col-md-11">
            <div className="p-3 border bg-light rounded ">
              <InfoDolar />
            </div>
          </div>
        </div>
      </div>
      <div className="container-fluid">
        <div className="row justify-content-center">
          <div className="col-md-11">
            <GraficoCotizacionDolarOficialMensual />
            <GraficoCotizacionDolarBlueMensual />
            <GraficoCotizacionDolarBolsaMensual />
            <GraficoCotizacionDolarContadoConLiquiMensual />
          </div>
        </div>
      </div>
      <div className="container-fluid">
        <div className="row justify-content-center">
          <div className="col-md-11">
            <div className="p-3 border bg-light rounded ">
              <TasasPlazoFijo />
            </div>
          </div>
        </div>
      </div>
      <GraficoCotizacionPlazoFijoBCRA />

      <GraficoInflacionMensual />
      <GraficoInflacionAcumulada />
      <GraficoInflacionInteranual />

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

      <Footer />
    </>
  );
}

export default App;
