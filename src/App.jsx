import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { NavBar } from "./components/NavBar";
import { Footer } from "./components/Footer";
import PaginaPrincipal from "./components/PaginaPrincipal";
import { PaginaInflacion } from "./components/PaginaInflacion"; // Este es el nuevo componente para la página principal
import { PaginaInteresCompuestoIngEgr } from "./components/PaginaInteresCompuestoIngEgr";
import { PaginaTasasInteres } from "./components/PaginaTasasInteres";

function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<PaginaPrincipal />} />
        <Route path="/inflacion" element={<PaginaInflacion />} />
        <Route path="/tasas-interes" element={<PaginaTasasInteres />} />
        <Route path="/calculos" element={<PaginaInteresCompuestoIngEgr />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
