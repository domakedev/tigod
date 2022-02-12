import React from "react";
import Button from "../Buttons/Button";
import { useNavigate } from "react-router";
import Logo from "../../../assets/Logotipo.png";
import { Link } from "react-router-dom";
import { slide as Menu } from "react-burger-menu";
import "./styles.css";

const Header = () => {
  const navigate = useNavigate();
  return (
    <div className="header">
      <Link to="/">
        <img className="header-logotipo" src={Logo} alt="Tigod" />
      </Link>
      <div className="header_buttons">
        <Menu right isOpen={false}>
          <Link className="menu-item " to="/login">
            Login
          </Link>
          <Link className="menu-item " to="/register">
            Register
          </Link>
        </Menu>
        <Button
          text="Iniciar Sesion"
          type="secondary"
          fun={() => {
            navigate("/login");
          }}
          hidden
        />
        <Button
          text="Registrarme"
          type="principal"
          fun={() => {
            navigate("/register");
          }}
          hidden
        />
      </div>
    </div>
  );
};

export default Header;
