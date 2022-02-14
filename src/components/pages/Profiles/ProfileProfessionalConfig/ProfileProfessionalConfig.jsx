import React, { useState } from "react";
import "./ProfileProfessionalConfig.css";

// Images
// import VoidImage from "../../../../assets/void.png";

// Components
import CardConnection from "../../../layouts/Cards/CardConnection/CardConnection";
import Header from "../../../layouts/Header/Header";
import Footer from "../../../layouts/Footer/Footer";
import Button from "../../../layouts/Buttons/Button";
import CardUpdatePhoto from "../../../layouts/Cards/CardUpdatePhoto/CardUpdatePhoto";
import CardWorkedCities from "../../../layouts/Cards/CardWorkedCities/CardWorkedCities";
import CardOneWorkExperience from "../../../layouts/Cards/CardOneWorkExperience/CardOneWorkExperience";

const ProfileProfessionalConfig = () => {
  const [connectionState, setConnectionState] = useState(false);

  return (
    <div className="page-container">
      <Header />
      <div className="main-content config-professional-main-content">
        <CardConnection
          connectionState={connectionState}
          setConnectionState={setConnectionState}
        />
        <div className="config-card">
          <p className="config-card-title">Tus datos profesionales</p>
          <label className="config-card-label" htmlFor="name">
            Nombre
          </label>
          <input type="text" id="name" placeholder="Ingresa tu nombre" />
          <label className="config-card-label" htmlFor="profesion">
            Profesión
          </label>
          <input
            type="text"
            id="profesion"
            placeholder="Ingresa tu profesion"
          />
          <label className="config-card-label" htmlFor="actualwork">
            Lugar de trabajo actual
          </label>
          <input
            type="text"
            id="actualwork"
            placeholder="Ingresa tu lugar de trabajo actual"
          />
        </div>

        <CardUpdatePhoto />

        <CardWorkedCities />

        <CardOneWorkExperience />

        <Button text="Actualizar" type="success" />
      </div>
      <Footer />
    </div>
  );
};

export default ProfileProfessionalConfig;
