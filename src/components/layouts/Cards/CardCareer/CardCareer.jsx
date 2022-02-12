import React from "react";
import "./CardCareer.css";
import VoidImagen from "../../../../assets/void.png";
import Button from "../../Buttons/Button";

const CardCareer = ({
  image = VoidImagen,
  title = "Titulo",
  emoji,
  description = "Descripcion",
}) => {
  return (
    <div className="career-card">
      <img className="career-card-image" src={image} alt="profesion" />
      <div className="career-card-texts">
        <p className="career-card-title">{title}</p>
        <p className="career-card-description">{description}</p>
        <img className="career-card-emoji" src={emoji} alt="emoji" />
        <Button text="Conocer mas" type="principal" />
      </div>
    </div>
  );
};

export default CardCareer;
