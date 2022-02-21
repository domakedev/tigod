import React from "react";
import VoidImage from "../../../../assets/void.png";
import "./CardFeature.css";

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
