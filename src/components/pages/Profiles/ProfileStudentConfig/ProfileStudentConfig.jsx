import React, { useState, useEffect } from "react";
import "./ProfileStudentConfig.css";
import { useAuth0 } from "@auth0/auth0-react";
import Swal from "sweetalert2";

// Components
import Header from "../../../layouts/Header/Header";
import Footer from "../../../layouts/Footer/Footer";
// import Switch from "../../../layouts/Inputs/Switch/Switch";
import Button from "../../../layouts/Buttons/Button";
import CardConnection from "../../../layouts/Cards/CardConnection/CardConnection";

// Images
import VoidImage from "../../../../assets/void.png";

// Apollo
import { useMutation, useQuery, gql } from "@apollo/client";
const OBTENER_USUARIO = gql`
  query obtenerUsuario($email: String!) {
    obtenerUsuario(email: $email) {
      id
      name
      role
      email
      isOnline
    }
  }
`;
const ACTUALIZAR_USUARIO = gql`
  mutation actualizarUsuario($email: String, $input: UsuarioInput) {
    actualizarUsuario(email: $email, input: $input) {
      name
      email
      role
    }
  }
`;

const ProfileStudentConfig = () => {
  const { user } = useAuth0();
  const [configUser, setConfigUser] = useState({
    name: "",
    isOnline: false,
  });

  const email = user?.email;
  const { data } = useQuery(OBTENER_USUARIO, {
    variables: {
      email,
    },
    skip: !user?.email.includes("@"),
  });

  useEffect(() => {
    // const datita = data?.obtenerUsuario;
    if (data?.obtenerUsuario?.email) {
      // setConfigUser({
      //   ...configUser,
      //   name,
      // });
      setConfigUser(data.obtenerUsuario);
    }
  }, [data]);

  const onChangeName = (e) => {
    setConfigUser({
      ...configUser,
      [e.target.name]: e.target.value,
    });
  };

  const [actualizarUsuario] = useMutation(ACTUALIZAR_USUARIO);

  const updateUser = async () => {
    console.log("actualizand usuario desde profile config");
    try {
      console.log(
        "🚀 ~ file: ProfileStudentConfig.jsx ~ line 81 ~ configUser",
        configUser
      );
      const { id, __typename, ...enviarUsuario } = configUser;
      console.log(
        "🚀 ~ file: ProfileStudentConfig.jsx ~ line 81 ~ enviarUsuario",
        enviarUsuario
      );
      console.log("mega user", user?.email);
      // eslint-disable-next-line no-unused-vars
      const { data } = await actualizarUsuario({
        variables: {
          email: user?.email,
          input: enviarUsuario,
        },
      });
      Swal.fire({
        title: "Se actualizo tu información!",
        // text: 'Do you want to continue',
        icon: "success",
        confirmButtonText: "Ok",
      });
    } catch (error) {
      console.log("🚀 ~ file: Register.jsx ~ line 43 ~ error", error);
    }
  };

  const definirEstado = (estado) => {
    setConfigUser({
      ...configUser,
      isOnline: estado,
    });
  };

  if (!data?.obtenerUsuario?.email) {
    return "Cargando emailito";
  }

  return (
    <div className="page-container">
      <Header />
      <div className="main-content config-main-content">
        <CardConnection fun={definirEstado} status={configUser.isOnline} />
        <div className="config-card">
          <p className="config-card-title">Tu nombre</p>
          <label htmlFor="name"></label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Ingresa tu nombre"
            value={configUser.name}
            onChange={(e) => onChangeName(e)}
          />
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
        <Button text="Actualizar" type="success" fun={updateUser} />
      </div>
      <Footer />
    </div>
  );
};

export default ProfileStudentConfig;
