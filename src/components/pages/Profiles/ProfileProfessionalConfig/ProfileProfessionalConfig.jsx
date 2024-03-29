import React, { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import Swal from "sweetalert2";
import "./ProfileProfessionalConfig.css";

// Images
// import VoidImage from "../../../../assets/void.png";

// Components
import CardConnection from "../../../layouts/Cards/CardConnection/CardConnection";
import Header from "../../../layouts/Header/Header";
import Footer from "../../../layouts/Footer/Footer";
import Button from "../../../layouts/Buttons/Button";
import CardUpdatePhoto from "../../../layouts/Cards/CardUpdatePhoto/CardUpdatePhoto";
import CardWorkedCities from "../../../layouts/Cards/CardWorkedCities/CardWorkedCities";
import CardOneWorkExperience from "../../../layouts/Cards/CardOneWorkExperience/CardOneWorkExperience";
import CardAnuncio from "../../../layouts/Cards/CardAnuncio/CardAnuncio";

// Apollo
import { useMutation, useQuery, gql } from "@apollo/client";
const { v4: uuid } = require("uuid");

const OBTENER_USUARIO = gql`
  query obtenerUsuario($email: String!) {
    obtenerUsuario(email: $email) {
      id
      name
      role
      email
      isOnline
      photo
      workPlaces
      profession
      actualWorkPlace
      experiences {
        cargo
        empresa
        inicio
        fin
      }
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

const ProfileProfessionalConfig = () => {
  const { user } = useAuth0();
  const [actualizarUsuario] = useMutation(ACTUALIZAR_USUARIO);

  const [configUser, setConfigUser] = useState({
    name: "",
    isOnline: false,
    photo: "",
    workPlaces: [{}],
    profession: "",
    actualWorkPlace: "",
    experiences: [],
  });

  const email = user?.email;
  const { data } = useQuery(OBTENER_USUARIO, {
    variables: {
      email,
    },
    skip: !user?.email.includes("@"),
  });

  useEffect(() => {
    if (data?.obtenerUsuario?.email) {
      setConfigUser(data.obtenerUsuario);
    }
  }, [data]);

  const updateUser = async () => {
    try {
      const { id, __typename, ...enviarUsuario } = configUser;

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

  const onChangeName = (e) => {
    setConfigUser({
      ...configUser,
      [e.target.name]: e.target.value,
    });
  };

  const onChangeProfesion = (e) => {
    setConfigUser({
      ...configUser,
      [e.target.name]: e.target.value,
    });
  };
  const onChangeActualWorkPlace = (e) => {
    setConfigUser({
      ...configUser,
      [e.target.name]: e.target.value,
    });
  };

  const definirEstado = (estado) => {
    setConfigUser({
      ...configUser,
      isOnline: estado,
    });
  };

  const cargarNuevaFoto = (photo) => {
    setConfigUser({
      ...configUser,
      photo: photo,
    });
  };

  const updateWorkPlaces = (ciudades) => {
    setConfigUser({
      ...configUser,
      workPlaces: ciudades,
    });
  };

  const addExperience = (experience) => {
    const tempExperiences = [...configUser.experiences];

    // Añadir experiencia
    tempExperiences.push(experience);

    setConfigUser({
      ...configUser,
      experiences: tempExperiences,
    });
  };

  const deleteExperience = (experience) => {
    const tempExperiences = [...configUser.experiences];

    // Filtrado
    const filtrado = tempExperiences.filter(
      (e) =>
        e.cargo !== experience.cargo &&
        e.empresa !== experience.empresa &&
        e.inicio !== experience.inicio &&
        e.fin !== experience.fin
    );
    // Borrar experiencia

    setConfigUser({
      ...configUser,
      experiences: filtrado,
    });
  };

  if (!data?.obtenerUsuario?.email) {
    return (
      <div className="w-full min-h-full flex justify-center items-center">
        <CardAnuncio
          title="Cargando..."
          description="Por favor espera"
        ></CardAnuncio>
      </div>
    );
  }

  return (
    <div className="page-container">
      <Header />
      <div className="main-content config-professional-main-content">
        <CardConnection fun={definirEstado} status={configUser.isOnline} />
        <div className="config-card">
          <p className="config-card-title">Tus datos profesionales</p>

          <label className="config-card-label" htmlFor="name">
            Nombre
          </label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Ingresa tu nombre"
            value={configUser.name}
            onChange={(e) => onChangeName(e)}
          />

          <label className="config-card-label" htmlFor="profesion">
            Profesión
          </label>
          <input
            type="text"
            id="profesion"
            placeholder="Ingresa tu profesion"
            name="profession"
            value={configUser.profession}
            onChange={(e) => onChangeProfesion(e)}
          />
          <label className="config-card-label" htmlFor="actualWorkPlace">
            Lugar de trabajo actual
          </label>
          <input
            type="text"
            id="actualWorkPlace"
            placeholder="Lugar de trabajo actual"
            name="actualWorkPlace"
            value={configUser.actualWorkPlace}
            onChange={(e) => onChangeActualWorkPlace(e)}
          />
        </div>

        <CardUpdatePhoto
          prevImage={data?.obtenerUsuario?.photo}
          newImage={configUser?.photo}
          cargarNuevaFoto={cargarNuevaFoto}
        />
        <CardWorkedCities
          updateWorkPlaces={updateWorkPlaces}
          workPlaces={data?.obtenerUsuario?.workPlaces}
        />

        {configUser?.experiences?.map((experience) => (
          <CardOneWorkExperience
            key={uuid()}
            cargo={experience.cargo}
            empresa={experience.empresa}
            inicio={experience.inicio}
            fin={experience.fin}
            eliminarOption={true}
            fun={deleteExperience}
          />
        ))}

        <CardOneWorkExperience fun={addExperience} />

        <Button text="Actualizar" type="success" fun={updateUser} />
      </div>
      <Footer />
    </div>
  );
};

export default ProfileProfessionalConfig;
