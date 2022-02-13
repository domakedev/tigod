import React from "react";
import Button from "../Buttons/Button";
import { useAuth0 } from "@auth0/auth0-react";
import Logo from "../../../assets/Logotipo.png";
import { Link } from "react-router-dom";
import { slide as Menu } from "react-burger-menu";
import "./Header.css";

const Header = () => {
  const { loginWithRedirect, logout, user, isAuthenticated } = useAuth0();
  console.log(
    "🚀 ~ file: Header.jsx ~ line 13 ~ isAuthenticated",
    isAuthenticated
  );
  console.log("🚀 ~ file: Header.jsx ~ line 13 ~ user", user);

  return (
    <div className="header">
      <Link to="/">
        <img className="header-logotipo" src={Logo} alt="Tigod" />
      </Link>
      <div className="header_buttons">
        <Menu right isOpen={false}>
          {isAuthenticated ? (
            <Link
              className="menu-item "
              to=""
              onClick={() => {
                logout({ returnTo: window.location.origin });
              }}
            >
              Cerrar Sesión
            </Link>
          ) : (
            <>
              <Link
                className="menu-item "
                to=""
                onClick={() => {
                  loginWithRedirect();
                }}
              >
                Iniciar Sesión
              </Link>{" "}
              <br />
              <Link
                className="menu-item "
                to=""
                onClick={() => {
                  loginWithRedirect({ screen_hint: "signup" });
                }}
              >
                Registrarme
              </Link>
            </>
          )}
        </Menu>
        <div></div>
        {isAuthenticated ? (
          <Button
            text="Cerrar Sesion"
            type="alert"
            fun={() => {
              logout({ returnTo: window.location.origin });
            }}
            hidden
          />
        ) : (
          <>
            <Button
              text="Iniciar Sesión"
              type="secondary"
              fun={() => {
                loginWithRedirect();
              }}
              hidden
            />
            <Button
              text="Registrarme"
              type="principal"
              fun={() => {
                loginWithRedirect({ screen_hint: "signup" });
              }}
              hidden
            />
          </>
        )}
      </div>
    </div>
  );
};

export default Header;
