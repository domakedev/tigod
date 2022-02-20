import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import actions from "../../../store/actions";
import { useDispatch } from "react-redux";

// Components
import Footer from "../../layouts/Footer/Footer";
import Button from "../../layouts/Buttons/Button";
import CardAnuncio from "../../layouts/Cards/CardAnuncio/CardAnuncio";
// import CardRegister from "../../layouts/Cards/CardRegister/CardRegister";

// Icons & Images
import HomeIcon from "../../../assets/icons/home.svg";

import "./Register.css";

// Apollo
import { gql, useQuery, useMutation } from "@apollo/client";
const ACTUALIZAR_USUARIO = gql`
  mutation actualizarUsuario($email: String, $input: UsuarioInput) {
    actualizarUsuario(email: $email, input: $input) {
      name
      email
      role
      chatUsername
      chatUserSecret
    }
  }
`;
const OBTENER_USUARIO = gql`
  query obtenerUsuario($email: String!) {
    obtenerUsuario(email: $email) {
      id
      name
      role
      email
      isOnline
      photo
    }
  }
`;

const AUTENTICAR_USUARIO = gql`
  mutation autenticarUsuario($input: UsuarioInput) {
    autenticarUsuario(input: $input) {
      user {
        email
        role
        isOnline
        photo
      }
      token
    }
  }
`;

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [role, setRole] = useState("Estudiante");
  const { user, isAuthenticated } = useAuth0();
  const [actualizarUsuario] = useMutation(ACTUALIZAR_USUARIO);
  const [autenticarUsuario] = useMutation(AUTENTICAR_USUARIO);

  const email = user?.email;
  const { data } = useQuery(OBTENER_USUARIO, {
    variables: {
      email,
    },
    skip: !user?.email.includes("@"),
  });

  const autenticarEsteUsuario = async () => {
    try {
      const { data } = await autenticarUsuario({
        variables: {
          input: {
            email: user.email,
            isAuth: isAuthenticated,
          },
        },
      });
      localStorage.setItem("token", data?.autenticarUsuario?.token);
      console.log("🚀 ~ file: App.js ~ line 147 ~ dataaaaaaaaaaa", data);
    } catch (error) {
      console.log("🚀 ~ file: App.js ~ line 155 ~ error", error);
    }
  };

  useEffect(() => {
    if (data?.obtenerUsuario?.role === "Estudiante") {
      navigate(`/miperfil/estudiante/${data?.obtenerUsuario?.email}`);
    }
    if (data?.obtenerUsuario?.role === "Profesional") {
      navigate(`/miperfil/profesional/${data?.obtenerUsuario?.email}`);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  const updateUser = async () => {
    try {
      const { data } = await actualizarUsuario({
        variables: {
          email: user?.email,
          input: {
            role: role,
          },
        },
      });
      await dispatch(actions.saveAuthUser(data?.actualizarUsuario));
      autenticarEsteUsuario();

      if (role === "Estudiante") {
        navigate("/test");
      }
      if (role === "Profesional") {
        navigate(`/miperfil/profesional/${user?.email}`);
      }
    } catch (error) {
      console.log("🚀 ~ file: Register.jsx ~ line 43 ~ error", error);
    }
  };

  if (user === undefined) {
    return (
      <div className="w-full min-h-full flex justify-center items-center">
        <CardAnuncio
          title="Primero create una cuenta"
          description="Retrocede al inicio"
        ></CardAnuncio>
      </div>
    );
  }

  return (
    <div className="page-container">
      <Link className="home-icon" to="/">
        <img src={HomeIcon} alt="Regresar al inicio" />
      </Link>

      <div className="main-content">
        {/* <CardRegister /> */}
        <h2 className="register-role-title">
          Para finalizar, selecciona tu tipo de usuario:
        </h2>
        <div className="register-select-role">
          <label htmlFor="selectrole1">
            <input
              type="radio"
              id="selectrole1"
              name="role"
              value="Estudiante"
              checked={role === "Estudiante"}
              onChange={(e) => setRole(e.target.value)}
            />
            Estudiante
          </label>

          <label htmlFor="selectrole2">
            <input
              type="radio"
              id="selectrole2"
              name="role"
              value="Profesional"
              checked={role === "Profesional"}
              onChange={(e) => setRole(e.target.value)}
            />
            Profesional
          </label>
          <Button text="Enviar" fun={updateUser} />
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Register;
