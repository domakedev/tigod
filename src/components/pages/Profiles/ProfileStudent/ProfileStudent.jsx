import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./ProfileStudent.css";

// Components
import Header from "../../../layouts/Header/Header";
import Footer from "../../../layouts/Footer/Footer";
import CardFeature from "../../../layouts/Cards/CardFeature/CardFeature";
import CardAnuncio from "../../../layouts/Cards/CardAnuncio/CardAnuncio";

// Images
import RegisterHeader from "../../../../assets/RegisterHeader.svg";

// Images goals
import IndustryImage from "../../../../assets/goals/industry.svg";
import PlanetImage from "../../../../assets/goals/planet.svg";
import LiderImage from "../../../../assets/goals/lider.svg";

// Images qualities
import MathImage from "../../../../assets/qualities/math.svg";
import NaturalImage from "../../../../assets/qualities/natural.svg";
import OradorImage from "../../../../assets/qualities/orador.svg";

// Apollo
import { useQuery, gql } from "@apollo/client";
const { v4: uuid } = require("uuid");
const OBTENER_USUARIO = gql`
  query obtenerUsuario($email: String!) {
    obtenerUsuario(email: $email) {
      name
      email
      role
      photo
      isOnline
      workPlaces
      chatUsername
      chatUserSecret
      isAuth
      vocation
      universityInterestedIn
      goals
      qualities
    }
  }
`;

const ProfileStudent = () => {
  const params = useParams();
  const navigate = useNavigate();

  const email = params.email;
  const { error, data } = useQuery(OBTENER_USUARIO, {
    variables: {
      email,
    },
    skip: !email.includes("@"),
  });

  const realUser = data?.obtenerUsuario;

  const definirQualities = (string) => {
    switch (string) {
      case "orador":
        return (
          <CardFeature
            key={uuid()}
            title="Orador"
            image={OradorImage}
            description="Facilidad para hablar en público"
          ></CardFeature>
        );
      case "fisico":
        return (
          <CardFeature
            key={uuid()}
            title="Fisico"
            image={MathImage}
            description="Le son faciles los problemas de fisica"
          ></CardFeature>
        );
      case "natural":
        return (
          <CardFeature
            key={uuid()}
            title="Natural"
            image={NaturalImage}
            description="Ama y sabe como tratar a los animales"
          ></CardFeature>
        );

      default:
        break;
    }
  };
  const definirGoal = (string) => {
    switch (string) {
      case "trabajo-gran-industria":
        return (
          <CardFeature
            key={uuid()}
            title="Una gran industria"
            image={IndustryImage}
            description="Quiere trabajar en una gran compañia industrial"
          ></CardFeature>
        );
      case "ser-un-lider":
        return (
          <CardFeature
            key={uuid()}
            title="Ser un LIDER"
            image={LiderImage}
            description="Quiere dirigir un gran equipo"
          ></CardFeature>
        );
      case "salvar-planeta":
        return (
          <CardFeature
            key={uuid()}
            title="Salvar el planeta"
            image={PlanetImage}
            description="Quiere salvar su entorno y a las especies en peligro"
          ></CardFeature>
        );

      default:
        break;
    }
  };

  if (error?.message === "No existe ese Usuario") {
    return (
      <div className="w-full min-h-full flex justify-center items-center">
        <CardAnuncio
          title="Parece que no deberías estar aquí"
          description=" "
        ></CardAnuncio>
      </div>
    );
  }

  if (realUser?.role !== "Estudiante") {
    navigate("/");
  }

  return (
    <div className="page-container">
      <Header />
      <div className="main-content profile-student-container">
        <div className="profile-card">
          <div className="profile-card-header">
            <p className="profile-card-header-title">
              ¡Bienvenido al perfil de {realUser?.name}!
            </p>
            <p className="profile-card-header-description">
              Esta es su información pública
            </p>
            <img
              className="profile-card-header-img"
              src={RegisterHeader}
              alt=""
            />
          </div>
          <div className="profile-card-body">
            <img
              src={realUser?.photo}
              alt=""
              className="profile-card-body-image"
            />

            <div className="profile-card-body-block-text">
              <p>{realUser?.name}</p>
              <span>Estudiante</span>
            </div>
            <div className="profile-card-body-block-text">
              <p>{realUser?.careersInterested}</p>
              <span>Preferencias profesionales</span>
            </div>
            <div className="profile-card-body-block-text">
              {realUser?.universityInterestedIn.map((e) => (
                <p key={uuid()}>- {e}</p>
              ))}
              <span>Universidades de su interés</span>
            </div>
          </div>
        </div>
        <div className="student-sections">
          <div className="student-qualities">
            <p className="student-qualities-title">Mejores cualidades</p>
            <div className="student-qualities-cards">
              {realUser?.qualities?.map((e) => definirQualities(e))}
            </div>
          </div>
          <div className="student-goals">
            <p className="student-qualities-title">Metas</p>
            <div className="student-qualities-cards">
              {realUser?.goals?.map((e) => definirGoal(e))}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ProfileStudent;
