import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { NavBar } from "./components/NavBar";
import { Footer } from "./components/Footer";
import PaginaPrincipal from "./components/PaginaPrincipal";
import { PaginaInflacion } from "./components/PaginaInflacion"; // Este es el nuevo componente para la página principal
import { PaginaInteresCompuestoIngEgr } from "./components/PaginaInteresCompuestoIngEgr";
import { PaginaTasasInteres } from "./components/PaginaTasasInteres";
import { PaginaTasasDeInteresPro } from "./components/PaginaTasasDeInteresPro";
import { PaginaAnalisis } from "./components/PaginaAnalisis";

function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<PaginaPrincipal />} />
        <Route path="/inflacion" element={<PaginaInflacion />} />
        <Route path="/tasas-interes" element={<PaginaTasasInteres />} />
        <Route path="/calculos" element={<PaginaInteresCompuestoIngEgr />} />
        <Route path="/analisis" element={<PaginaAnalisis />} />
        <Route
          path="/tasas-interes-pro"
          element={<PaginaTasasDeInteresPro />}
        />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
