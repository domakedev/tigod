import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

// Apollo
import { gql, useMutation } from "@apollo/client";

// Components
import Footer from "../../layouts/Footer/Footer";
import Button from "../../layouts/Buttons/Button";
// import CardRegister from "../../layouts/Cards/CardRegister/CardRegister";

// Icons & Images
import HomeIcon from "../../../assets/icons/home.svg";

import "./Register.css";

const ACTUALIZAR_USUARIO = gql`
  mutation actualizarUsuario($email: String, $input: UsuarioInput) {
    actualizarUsuario(email: $email, input: $input) {
      name
      email
      role
    }
  }
`;

const Register = () => {
  const navigate = useNavigate();
  const [role, setRole] = useState("Estudiante");
  const { user } = useAuth0();
  console.log("🚀 ~ file: Register.jsx ~ line 31 ~ user", user);
  const [actualizarUsuario] = useMutation(ACTUALIZAR_USUARIO);

  const updateUser = async () => {
    console.log("adasd");
    try {
      const { data } = await actualizarUsuario({
        variables: {
          email: user?.email,
          input: {
            role: role,
          },
        },
      });
      if (role === "Estudiante") {
        navigate("/test");
      }
      if (role === "Profesional") {
        navigate(`/miperfil/profesional/${user?.email}`);
      }
      console.log("🚀 ~ file: Register.jsx ~ line 37 ~ data", data);
    } catch (error) {
      console.log("🚀 ~ file: Register.jsx ~ line 43 ~ error", error);
    }
  };

  if (user === undefined) {
    return "cargando... pue";
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
