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
      className: "image-container-argentina-finanzas",
      url: "https://www.argentina.gob.ar/economia/finanzas",
      text: "FINANZAS",
    },
    {
      className: "image-container-estudio-tareas",
      url: "https://www.apptareas.estudiobeguier.com.ar//",
      text: "TAREAS",
    },
    {
      className: "image-container-errepar",
      url: "https://www.errepar.com/",
      text: "ERREPAR",
    },
    {
      className: "image-container-indec",
      url: "https://www.indec.gob.ar/",
      text: "INDEC",
    },
    {
      className: "image-container-dolar-hoy",
      url: "https://dolarhoy.com/",
      text: "DOLAR ",
    },
    {
      className: "image-container-cripto",
      url: "https://criptoya.com/",
      text: "CRIPTO ",
    },
    {
      className: "image-container-iprofesional",
      url: "https://www.iprofesional.com/",
      text: "IPROFES.",
    },
    {
      className: "image-container-infobae",
      url: "https://www.infobae.com/",
      text: "INFOBAE",
    },
    {
      className: "image-container-el-cronista",
      url: "https://www.cronista.com/",
      text: "CRONISTA",
    },
    {
      className: "image-container-mi-argentina",
      url: "https://www.argentina.gob.ar/miargentina",
      text: "MI ARG.",
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
            onKeyPress={(e) =>
              e.key === "Enter" && window.open(enlace.url, "_blank")
            }
          />
          <span>{enlace.text}</span>
        </div>
      ))}
    </div>
  );
};
