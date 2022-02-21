import React, { useState, useEffect } from "react";
import "./ProfileStudentConfig.css";
import { useAuth0 } from "@auth0/auth0-react";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";
import actions from "../../../../store/actions";

// Components
import Header from "../../../layouts/Header/Header";
import Footer from "../../../layouts/Footer/Footer";
// import Switch from "../../../layouts/Inputs/Switch/Switch";
import Button from "../../../layouts/Buttons/Button";
import CardConnection from "../../../layouts/Cards/CardConnection/CardConnection";
import CardUpdatePhoto from "../../../layouts/Cards/CardUpdatePhoto/CardUpdatePhoto";
import CardAnuncio from "../../../layouts/Cards/CardAnuncio/CardAnuncio";

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
      photo
      universityInterestedIn
      goals
      qualities
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
  const dispatch = useDispatch();
  const { user } = useAuth0();
  const [configUser, setConfigUser] = useState({
    name: "",
    isOnline: false,
    photo: "",
    universityInterestedIn: [""],
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
      setConfigUser(data.obtenerUsuario);
    }
  }, [data]);

  const [actualizarUsuario] = useMutation(ACTUALIZAR_USUARIO);

  const updateUser = async () => {
    try {
      // Actualizar DB
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

      // Actualizar Frontend
      console.log(
        "🚀 ~ file: ProfileStudentConfig.jsx ~ line 90 ~ configUser?.universityInterestedIn",
        configUser?.universityInterestedIn
      );
      dispatch(actions.saveMyUnisInteres(configUser?.universityInterestedIn));
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

  const definirUniInteres = (e) => {
    const name = e.target.name;
    const status = e.target.checked;
    // Si es true agregar
    if (status === true) {
      const nuevoConfigUser = { ...configUser };

      if (!nuevoConfigUser.universityInterestedIn) {
        nuevoConfigUser["universityInterestedIn"] = [];
      }

      const nuevoArr = [...nuevoConfigUser["universityInterestedIn"]];

      nuevoArr.push(name);

      setConfigUser({
        ...configUser,
        universityInterestedIn: nuevoArr,
      });
    } else if (status === false) {
      const nuevoConfigUser = { ...configUser };
      const quitado = nuevoConfigUser.universityInterestedIn.filter(
        (u) => u !== name
      );
      setConfigUser({
        ...configUser,
        universityInterestedIn: quitado,
      });
    }
  };
  const definirGoals = (e) => {
    const name = e.target.name;
    const status = e.target.checked;
    // Si es true agregar
    if (status === true) {
      const nuevoConfigUser = { ...configUser };

      if (!nuevoConfigUser.goals) {
        nuevoConfigUser["goals"] = [];
      }

      const nuevoArr = [...nuevoConfigUser["goals"]];

      nuevoArr.push(name);

      setConfigUser({
        ...configUser,
        goals: nuevoArr,
      });
    } else if (status === false) {
      const nuevoConfigUser = { ...configUser };
      const quitado = nuevoConfigUser?.goals?.filter((g) => g !== name);
      setConfigUser({
        ...configUser,
        goals: quitado,
      });
    }
  };
  const definirQualities = (e) => {
    const name = e.target.name;
    const status = e.target.checked;
    // Si es true agregar
    if (status === true) {
      const nuevoConfigUser = { ...configUser };

      if (!nuevoConfigUser.qualities) {
        nuevoConfigUser["qualities"] = [];
      }

      const nuevoArr = [...nuevoConfigUser["qualities"]];

      nuevoArr.push(name);

      setConfigUser({
        ...configUser,
        qualities: nuevoArr,
      });
    } else if (status === false) {
      const nuevoConfigUser = { ...configUser };
      const quitado = nuevoConfigUser?.qualities?.filter((g) => g !== name);
      setConfigUser({
        ...configUser,
        qualities: quitado,
      });
    }
  };

  if (!data?.obtenerUsuario?.email) {
    return (
      <div className="w-full min-h-full flex justify-center items-center">
        <CardAnuncio title="Cargando..." description=" "></CardAnuncio>
      </div>
    );
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

        <CardUpdatePhoto
          prevImage={data?.obtenerUsuario?.photo}
          newImage={configUser?.photo}
          cargarNuevaFoto={cargarNuevaFoto}
        />

        <div className="config-card">
          <p className="config-card-title config-card-title_universities">
            Universidades de interés
          </p>
          <div className="config-card_universities">
            <label htmlFor="UPAO">
              <input
                type="checkbox"
                name="UPAO"
                id="UPAO"
                checked={configUser?.universityInterestedIn?.includes("UPAO")}
                onChange={(e) => {
                  definirUniInteres(e);
                }}
              />
              {""} UPAO
            </label>
            <label htmlFor="UPN">
              <input
                type="checkbox"
                name="UPN"
                id="UPN"
                checked={configUser?.universityInterestedIn?.includes("UPN")}
                onChange={(e) => {
                  definirUniInteres(e);
                }}
              />
              {""} UPN
            </label>
            <label htmlFor="UNT">
              <input
                type="checkbox"
                name="UNT"
                id="UNT"
                checked={configUser?.universityInterestedIn?.includes("UNT")}
                onChange={(e) => {
                  definirUniInteres(e);
                }}
              />
              {""} UNT
            </label>
          </div>
        </div>

        <div className="config-card">
          <p className="config-card-title config-card-title_universities">
            Tus metas
          </p>
          <div className="config-card_goals">
            <label htmlFor="ser-un-lider">
              <input
                type="checkbox"
                name="ser-un-lider"
                id="ser-un-lider"
                checked={configUser?.goals?.includes("ser-un-lider")}
                onChange={(e) => {
                  definirGoals(e);
                }}
              />
              {""} Ser un lider
            </label>
            <label htmlFor="trabajo-gran-industria">
              <input
                type="checkbox"
                name="trabajo-gran-industria"
                id="trabajo-gran-industria"
                checked={configUser?.goals?.includes("trabajo-gran-industria")}
                onChange={(e) => {
                  definirGoals(e);
                }}
              />
              {""} Trabajar en una gran industria
            </label>
            <label htmlFor="salvar-planeta">
              <input
                type="checkbox"
                name="salvar-planeta"
                id="salvar-planeta"
                checked={configUser?.goals?.includes("salvar-planeta")}
                onChange={(e) => {
                  definirGoals(e);
                }}
              />
              {""} Salvar el planeta
            </label>
          </div>
        </div>

        <div className="config-card">
          <p className="config-card-title config-card-title_universities">
            Tus cualidades
          </p>
          <div className="config-card_universities">
            <label htmlFor="orador">
              <input
                type="checkbox"
                name="orador"
                id="orador"
                checked={configUser?.qualities?.includes("orador")}
                onChange={(e) => {
                  definirQualities(e);
                }}
              />
              {""} Orador
            </label>
            <label htmlFor="fisico">
              <input
                type="checkbox"
                name="fisico"
                id="fisico"
                checked={configUser?.qualities?.includes("fisico")}
                onChange={(e) => {
                  definirQualities(e);
                }}
              />
              {""} fisico
            </label>
            <label htmlFor="natural">
              <input
                type="checkbox"
                name="natural"
                id="natural"
                checked={configUser?.qualities?.includes("natural")}
                onChange={(e) => {
                  definirQualities(e);
                }}
              />
              {""} natural
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
