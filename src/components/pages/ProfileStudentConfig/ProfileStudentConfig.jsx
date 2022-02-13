import React from "react";
import "./ProfileStudentConfig.css";

// Components
import Header from "../../layouts/Header/Header";
import Footer from "../../layouts/Footer/Footer";
import Switch from "../../layouts/Inputs/Switch/Switch";
import Button from "../../layouts/Buttons/Button";

// Images
import VoidImage from "../../../assets/void.png";

const ProfileStudentConfig = () => {
  return (
    <div className="page-container">
      <Header />
      <div className="main-content config-main-content">
        <div className="config-card">
          <p className="config-card-title">Estado de conexión</p>
          <Switch />
        </div>
        <div className="config-card">
          <p className="config-card-title">Tu nombre</p>
          <label htmlFor="name"></label>
          <input type="text" id="name" placeholder="Ingresa tu nombre" />
        </div>
        <div className="config-card">
          <p className="config-card-title">Tu foto de perfil</p>
          <div className="choose-one-option-config-photo">
            <label htmlFor="photo1">
              <img src={VoidImage} alt="" />
              <input type="radio" name="photo" id="photo1" />
              Anterior
            </label>
            <label htmlFor="photo2">
              <img src={VoidImage} alt="" />
              <input type="radio" name="photo" id="photo2" /> Nueva
            </label>
          </div>
        </div>

        <div className="config-card">
          <p className="config-card-title config-card-title_universities">
            Universidades de interés
          </p>
          <div className="config-card_universities">
            <label htmlFor="u1">
              <input type="checkbox" name="upao" id="u1" />
              {""} U1
            </label>
            <label htmlFor="u2">
              <input type="checkbox" name="upao" id="u2" />
              {""} Universidad nombre 2
            </label>
          </div>
        </div>

        <div className="config-card">
          <p className="config-card-title config-card-title_universities">
            Tus metas
          </p>
          <div className="config-card_universities">
            <label htmlFor="m1">
              <input type="checkbox" name="upao" id="m1" />
              {""} M1
            </label>
            <label htmlFor="m2">
              <input type="checkbox" name="upao" id="m2" />
              {""} MEta nombre 2
            </label>
          </div>
        </div>

        <div className="config-card">
          <p className="config-card-title config-card-title_universities">
            Tus cualidades
          </p>
          <div className="config-card_universities">
            <label htmlFor="c1">
              <input type="checkbox" name="upao" id="c1" />
              {""} C1
            </label>
            <label htmlFor="c2">
              <input type="checkbox" name="upao" id="c2" />
              {""} Cualidad nombre 2
            </label>
          </div>
        </div>
        <Button text="Actualizar" type="success" />
      </div>
      <Footer />
    </div>
  );
};

export default ProfileStudentConfig;
