import { useState } from "react";
import logo from "../assets/logoEstudio.png";
import whatsappIcon from "../assets/whatsapp.png";
import { obtenerFechaActual } from "../utilities/fechaActual.js";
import "../styles/NavBar.css";

export const NavBar = () => {
  const [showContact, setShowContact] = useState(true);
  const [showDate, setShowDate] = useState(true);

  // Función para manejar el clic en el botón de contacto
  const handleContactClick = () => {
    setShowContact(false); // Oculta el botón de contacto de inmediato
    setTimeout(() => {
      setShowContact(true);
      setShowDate(true); // Muestra la fecha
    }, 10000);
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg justify-content-center">
        <span className="navbar-brand">
          <img
            src={logo}
            className="d-inline-block align-top"
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
        </ul>
        {/* Condicional para mostrar u ocultar la fecha */}
        {showDate && (
          <span className="fecha-actual"> {obtenerFechaActual()}</span>
        )}
      </nav>
    </div>
  );
};
