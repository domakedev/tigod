import React from "react";
import "./CardAnuncio.css";

const CardAnuncio = ({
  title = "Titulo",
  icon,
  description = "Descripcion",
}) => {
  return (
    <div className="card-anuncio">
      <img className="anuncio-icon" src={icon} alt="" />
      <p className="anuncio-title">{title}</p>
      <p className="anuncio-description">{description}</p>
    </div>
  );
};

export default CardAnuncio;
