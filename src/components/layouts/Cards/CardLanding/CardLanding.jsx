import React from "react";
import Button from "../../Buttons/Button";
import "./styles.css";

const CardLanding = ({ image, description, buttonText, fun }) => {
  return (
    <div className="card-landing">
      <div className="card-image-container">
        <img className="card-image" src={image} alt="user" />
      </div>
      <p className="card-description">{description}</p>
      <Button text={buttonText} type="principal" fun={fun} />
    </div>
  );
};

export default CardLanding;
