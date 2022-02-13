import React from "react";
import "./CardFeature.css";
import VoidImage from "../../../../assets/void.png";

const CardFeature = ({
  title = "Titulo",
  image = VoidImage,
  description = "Descripción",
}) => {
  return (
    <div className="feature-card">
      <p className="feature-title">{title}</p>
      <img src={image} alt="" className="feature-image" />
      <p className="feature-description">{description}</p>
    </div>
  );
};

export default CardFeature;
