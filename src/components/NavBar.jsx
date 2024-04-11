import { useState } from "react";
import logo from "../assets/logoEstudio.png";
import whatsappIcon from "../assets/whatsapp.png";
import { obtenerFechaActual } from "../utilities/fechaActual.js";
import { useNavigate } from "react-router-dom";
import "../styles/NavBar.css";

export const NavBar = () => {
  const [showContact, setShowContact] = useState(true);
  const navigate = useNavigate(); // Hook para navegar a otras páginas

  // Función para manejar el clic en el botón de contacto
  const handleContactClick = () => {
    setShowContact(false); // Oculta el botón de contacto

    // Después de 10 segundos, cambia el estado de nuevo para mostrar el botón de contacto y la fecha
    setTimeout(() => {
      setShowContact(true);
    }, 10000);
  };

  const handleContactClick1 = () => {
    window.location.href = "/";
  };
  const handleContactClick2 = () => {
    navigate("/");
    window.scrollTo(0, 0);
  };
  const handleInflacionClick = () => {
    navigate("/inflacion");
    window.scrollTo(0, 0);
  };
  const handleTasasInteresClick = () => {
    navigate("/tasas-interes");
    window.scrollTo(0, 0);
  };

  const handleCalculosClick = () => {
    navigate("/calculos");
    window.scrollTo(0, 0);
  };
  const handleAnalisisClick = () => {
    navigate("/analisis");
    window.scrollTo(0, 0);
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg justify-content-center">
        <div className="navbar-content">
          <span className="navbar-brand">
            <img
              onClick={handleContactClick1}
              src={logo}
              className="d-inline-block align-top logo-estudio"
              alt="Logo del estudio"
            />
          </span>
          <ul className="navbar-nav">
            {showContact ? (
              <li className="nav-item">
                {/* Botón para mostrar contacto */}
                <span className="boton-navbar" onClick={handleContactClick}>
                  CONTACTO
                </span>
              </li>
            ) : (
              <li className="nav-item">
                {/* Icono de WhatsApp y número de teléfono una vez que se ha hecho clic en CONTACTO */}
                <img
                  src={whatsappIcon}
                  alt="WhatsApp"
                  className="whatsapp-icon"
                />
                <span className="telefono">(+54 9 388) 4781336</span>
              </li>
            )}
            <li className="nav-item">
              <span className="boton-navbar" onClick={handleContactClick2}>
                DOLAR
              </span>
            </li>
            <li className="nav-item">
              <span className="boton-navbar" onClick={handleInflacionClick}>
                INFLACION
              </span>
            </li>
            <li className="nav-item">
              <span className="boton-navbar" onClick={handleTasasInteresClick}>
                TNA (PF)
              </span>
            </li>
            <li className="nav-item">
              <span className="boton-navbar" onClick={handleAnalisisClick}>
                ANALISIS INTEGRAL
              </span>
            </li>
            <li className="nav-item">
              <span className="boton-navbar" onClick={handleCalculosClick}>
                CALCULOS AVANZADOS
              </span>
            </li>
          </ul>
        </div>
        <div className="fecha-actual-container">
          <div className="fecha-actual"> {obtenerFechaActual()}</div>
        </div>
      </nav>
    </div>
  );
};
