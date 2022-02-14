import React from "react";
import VoidImage from "../../../../assets/void.png";

const CardUpdatePhoto = ({ prevImage = VoidImage, newImage = VoidImage }) => {
  return (
    <div className="config-card">
      <p className="config-card-title">Tu foto de perfil</p>
      <div className="choose-one-option-config-photo">
        <label htmlFor="photo1">
          <img src={prevImage} alt="" />
          <input type="radio" name="photo" id="photo1" />
          Anterior
        </label>
        <label htmlFor="photo2">
          <img src={newImage} alt="" />
          <input type="radio" name="photo" id="photo2" /> Nueva
        </label>
      </div>
    </div>
  );
};

export default CardUpdatePhoto;
