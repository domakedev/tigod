import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import Button from "../Buttons/Button";
import Logo from "../../../assets/Logotipo.png";
import { Link, useNavigate } from "react-router-dom";
import { slide as Menu } from "react-burger-menu";
import { useSelector } from "react-redux";
import "./Header.css";

const Header = () => {
  const navigate = useNavigate();
  const authUser = useSelector((state) => state.authUser);
  const { loginWithRedirect, logout } = useAuth0();

  return (
    <div className="header">
      <Link to="/">
        <img className="header-logotipo" src={Logo} alt="Tigod" />
      </Link>
      {authUser?.role === "Estudiante" ? (
        <Link to="/mivocacion">Mi vocacion</Link>
      ) : null}      
      <div className="header_buttons">
        <Menu right isOpen={false}>
          {authUser ? (
            <>
              <Link
                className="menu-item "
                to=""
                onClick={() => {
                  localStorage.clear();
                  logout({ returnTo: window.location.origin });
                }}
              >
                Cerrar Sesión
              </Link>
              <br />
              <Link
                className="menu-item "
                to={`/miperfil/${authUser?.role}/${authUser?.email}`}
              >
                Mi Perfil
              </Link>
              <br />
              <Link
                className="menu-item "
                to={`/miperfil/${authUser?.role}/config`}
              >
                Configurar Mi Perfil
              </Link>
              <br />
              <Link className="menu-item " to={`/chat`}>
                Mis chats
              </Link>
            </>
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
        {authUser ? (
          <>
            <Button
              text="Cerrar Sesion"
              type="alert"
              fun={() => {
                localStorage.clear();
                logout({ returnTo: window.location.origin });
              }}
              hidden
            />
            <Button
              text="Mi Perfil"
              type="principal"
              fun={() => {
                navigate(`/miperfil/${authUser?.role}/${authUser?.email}`);
              }}
              hidden
            />
            <Button
              text="Configurar Mi Perfil"
              type="config"
              fun={() => {
                navigate(`/miperfil/${authUser?.role}/config`);
              }}
              hidden
            />
            <Button
              text="Mis Chats"
              type="principal"
              fun={() => {
                navigate(`/chat`);
              }}
              hidden
            />
          </>
        ) : (
          <>
            <Button
              text="Iniciar Sesión"
              type="secondary"
              fun={() => {
                loginWithRedirect({ returnTo: window.location.origin });
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

// export default React.memo(Header);
export default Header;
