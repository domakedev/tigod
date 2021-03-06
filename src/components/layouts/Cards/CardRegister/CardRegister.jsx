import React from "react";
import "./CardRegister.css";
import { Link } from "react-router-dom";
import Button from "../../Buttons/Button";

// Icons & Images
import RegisterHeader from "../../../../assets/RegisterHeader.svg";
import ListChecked from "../../../../assets/icons/listChecked.svg";

const CardRegister = () => {
  return (
    <div className="register-card">
      <div className="register-card-header">
        <p className="register-card-header-title">Registro Gratuito</p>
        <p className="register-card-header-description">
          {" "}
          Usa las mejores herramientas para descubrir tu vocación
        </p>
        <img className="register-card-header-img" src={RegisterHeader} alt="" />
      </div>
      <div className="register-card-body">
        <form className="register-body-inputs">
          <label className="register-label" htmlFor="email">
            {" "}
            Correo electrónico
            <input
              className="register-input"
              type="email"
              name="email"
              id="email"
              placeholder="Ingresa tu email"
            />
          </label>
          <label className="register-label" htmlFor="email">
            {" "}
            Nombre de usuario
            <input
              className="register-input"
              type="text"
              name="email"
              id="email"
              placeholder="Ej. Carlos Felipe"
            />
          </label>
          <label className="register-label" htmlFor="email">
            {" "}
            Contraseña
            <input
              className="register-input"
              type="password"
              name="email"
              id="email"
              placeholder="Ingresa tu contraseña"
            />
          </label>
          <Button text="Registrarme" type="principal" />
          <div className="register-login-section">
            <p>
              Ya tengo cuenta:
              <Link to="/login"> Iniciar Sesion</Link>
            </p>
          </div>
          <div className="register-terms">
            <img src={ListChecked} alt="" />
            <p className="register-terms-text">
              Registrandote aceptas nuestros <br />
              <Link to="/terms">Terminos y condiciones</Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CardRegister;
