import React from "react";
import { Link } from "react-router-dom";
import "./CardProfessional.css";

// Icons
import VoidImagen from "../../../../assets/void.png";
import BagIcon from "../../../../assets/icons/bag.svg";
import ProfileIcon from "../../../../assets/icons/profile.svg";
// import ChatIcon from "../../../../assets/icons/chat.svg";

const CardProfessional = ({
  image = VoidImagen,
  name = "Nombre",
  profession = "Profesión",
  place = "Lugar de Trabajo",
  email,
}) => {
  return (
    <div className="card-professional">
      <img className="profesional-image" src={image} alt="profesional" />
      <div className="profesional-texts">
        <p className="profesional-profession">
          {" "}
          <img src={BagIcon} alt="Profesión" />
          {profession}
        </p>
        <p className="profesional-place">
          <img src={BagIcon} alt="Profesión" />
          {place}
        </p>
        <div className="professional-buttons">
          <Link
            className="professional-button"
            to={`/miperfil/profesional/${email}`}
          >
            <img src={ProfileIcon} alt="" />
          </Link>
          {/* <Link className="professional-button" to="/">
            <img src={ChatIcon} alt="" />
          </Link> */}
        </div>
      </div>
      <p className="profesional-name">{name}</p>
    </div>
  );
};

export default CardProfessional;
