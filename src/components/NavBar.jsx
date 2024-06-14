import { useState, useEffect } from "react";
import logo from "../assets/logoEstudio.png";
import logo1 from "../assets/logoEstudio1.png";
import whatsappIcon from "../assets/whatsapp.png";
import { Link, useNavigate } from "react-router-dom";
import "../styles/NavBar.css";
import { obtenerFechaActual } from "../utilities/fechaActual.js";

export const NavBar = () => {
  const [showContact, setShowContact] = useState(true);
  const [showDate, setShowDate] = useState(true);
  const [showLogo1, setShowLogo1] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    let timer;
    if (!showContact && !showDate) {
      timer = setTimeout(() => {
        setShowContact(true);
        setShowDate(true);
      }, 10000);
    }
    return () => clearTimeout(timer);
  }, [showContact, showDate]);

  useEffect(() => {
    const logoTimer = setInterval(() => {
      setShowLogo1(prevShowLogo1 => !prevShowLogo1);
    }, 20000); // Cambia el logo cada 20 segundos
    return () => clearInterval(logoTimer);
  }, []);

  const handleContactClick = () => {
    setShowContact(false);
    setShowDate(false);
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
          <span className="navbar-brand logo-container">
            <Link to="/">
              <img
                src={logo}
                className={`d-inline-block align-top logo-img ${
                  showLogo1 ? "show" : ""
                }`}
                alt="logo"
              />
              <img
                src={logo1}
                className={`d-inline-block align-top logo-img ${
                  showLogo1 ? "" : "show"
                }`}
                alt="logo1"
              />
            </Link>
          </span>
          <ul className="navbar-nav">
            {showContact ? (
              <li className="nav-item">
                <span className="boton-navbar" onClick={handleContactClick}>
                  CONTACTO
                </span>
              </li>
            ) : (
              <li className="nav-item">
                <img
                  src={whatsappIcon}
                  alt="whatsapp"
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
        {showDate && (
          <div className="fecha-actual-container">
            <div className="fecha-actual"> {obtenerFechaActual()}</div>
          </div>
        )}
      </nav>
    </div>
  );
};
