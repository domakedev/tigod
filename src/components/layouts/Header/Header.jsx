import React, { useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import Button from "../Buttons/Button";
import Logo from "../../../assets/Logotipo.png";
import { Link, useNavigate } from "react-router-dom";
import { slide as Menu } from "react-burger-menu";
import actions from "../../../store/actions";
import { useDispatch, useSelector } from "react-redux";
import "./Header.css";

// Apollo
import { useQuery, gql } from "@apollo/client";
const OBTENER_USUARIO = gql`
  query obtenerUsuario($email: String!) {
    obtenerUsuario(email: $email) {
      name
      role
      email
      chatUsername
      chatUserSecret
    }
  }
`;

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const authUser = useSelector((state) => state.authUser);
  const { loginWithRedirect, logout, user, isAuthenticated } = useAuth0();

  const email = user?.email;
  const { data } = useQuery(OBTENER_USUARIO, {
    variables: {
      email,
    },
    skip: !user?.email.includes("@"),
  });

  useEffect(() => {
    if (data?.obtenerUsuario?.role !== "vacio") {
      dispatch(actions.saveAuthUser(data?.obtenerUsuario));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

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
                to={`/miperfil/${authUser?.role}/${user?.email}`}
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
                navigate(`/miperfil/${authUser?.role}/${user?.email}`);
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
