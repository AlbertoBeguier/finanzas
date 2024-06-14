import "../styles/Enlaces.css";

export const Enlaces = () => {
  const enlaces = [
    {
      className: "image-container-bcra",
      url: "https://www.bcra.gob.ar",
      text: "BCRA",
    },
    {
      className: "image-container-bna",
      url: "https://www.bna.com.ar",
      text: "BNA",
    },
    {
      className: "image-container-afip",
      url: "https://www.afip.gob.ar/landing/default.asp",
      text: "AFIP",
    },
    {
      className: "image-container-anses",
      url: "https://www.anses.gob.ar",
      text: "ANSES",
    },
    {
      className: "image-container-mteyss",
      url: "https://www.trabajo.gob.ar",
      text: "MTEYSS",
    },

    {
      className: "image-container-macro-p",
      url: "https://www.macro.com.ar/bancainternet/#",
      text: "MACRO P",
    },
    {
      className: "image-container-macro-e",
      url: "https://www.macro.com.ar/biempresas/#",
      text: "MACRO E",
    },
    {
      className: "image-container-estudio-tareas",
      url: "https://tareas.estudiobeguier.com.ar/",
      text: "TAREAS",
    },
  ];

  return (
    <div className="enlaces">
      <h4 className="h4-enlaces">ENLACES</h4>
      {enlaces.map((enlace, index) => (
        <div key={index} className="icon-container">
          <div
            className={enlace.className}
            onClick={() => window.open(enlace.url, "_blank")}
            role="button"
            tabIndex={0}
            onKeyPress={e =>
              e.key === "Enter" && window.open(enlace.url, "_blank")
            }
          />
          <span>{enlace.text}</span>
        </div>
      ))}
    </div>
  );
};
