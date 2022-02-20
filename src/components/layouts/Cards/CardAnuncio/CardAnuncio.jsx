import React from "react";
import Pointer from "../../../../assets/icons/alert.svg";
import "./CardAnuncio.css";

const CardAnuncio = ({
  title = "Titulo",
  icon = Pointer,
  description = "Descripcion",
  children,
}) => {
  return (
    <div className="card-anuncio">
      <img className="anuncio-icon" src={icon} alt="" />
      <p className="anuncio-title">{title}</p>
      <p className="anuncio-description">{description}</p>
      {children}
    </div>
  );
};

export default CardAnuncio;
