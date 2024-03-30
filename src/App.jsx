import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { NavBar } from "./components/NavBar";
import { Footer } from "./components/Footer";
import { InfoDolar } from "./components/InfoDolar";
import { InfoDolarAmbito } from "./components/InfoDolarAmbito";
import { TasasPlazoFijo } from "./components/TasasPlazoFijo";
import { GraficoInflacionMensual } from "./components/GraficoInflacionMensual";
import { CotizacionBitcoin } from "./components/CotizacionBitcoin";
import { GraficoInflacionInteranual } from "./components/GraficoInflacionInteranual";

function App() {
  return (
    <>
      <NavBar />
      <InfoDolar />
      <InfoDolarAmbito />
      <TasasPlazoFijo />
      <GraficoInflacionMensual />
      <GraficoInflacionInteranual />
      <CotizacionBitcoin />
      <Footer />
    </>
  );
}

export default App;
