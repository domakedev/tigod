import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import Button from "../Buttons/Button";
import Logo from "../../../assets/Logotipo.png";
import { Link, useNavigate } from "react-router-dom";
import { slide as Menu } from "react-burger-menu";
import "./Header.css";

// Apollo
import { useQuery, gql } from "@apollo/client";
const OBTENER_USUARIO = gql`
  query obtenerUsuario($email: String!) {
    obtenerUsuario(email: $email) {
      id
      name
      role
    }
  }
`;

const Header = () => {
  const navigate = useNavigate();
  const { loginWithRedirect, logout, user, isAuthenticated } = useAuth0();

  const email = user?.email;
  const { data } = useQuery(OBTENER_USUARIO, {
    variables: {
      email,
    },
    skip: !user?.email.includes("@"),
  });

  return (
    <div className="header">
      <Link to="/">
        <img className="header-logotipo" src={Logo} alt="Tigod" />
      </Link>
      <div className="header_buttons">
        <Menu right isOpen={false}>
          {isAuthenticated ? (
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
                to={`/miperfil/${data?.obtenerUsuario?.role}/${user?.email}`}
              >
                Mi Perfil
              </Link>
              <br />
              <Link
                className="menu-item "
                to={`/miperfil/${data?.obtenerUsuario?.role}/config`}
              >
                Configurar Mi Perfil
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
        {isAuthenticated ? (
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
                navigate(
                  `/miperfil/${data?.obtenerUsuario?.role}/${user?.email}`
                );
              }}
              hidden
            />
            <Button
              text="Configurar Mi Perfil"
              type="config"
              fun={() => {
                navigate(`/miperfil/${data?.obtenerUsuario?.role}/config`);
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

export default React.memo(Header);
