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
import VoidImage from "../../../../assets/void.png";

// Apollo
import { useQuery, gql } from "@apollo/client";
const OBTENER_USUARIO = gql`
  query obtenerUsuario($email: String!) {
    obtenerUsuario(email: $email) {
      id
      name
      role
      photo
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

  const userVisited = {
    image: VoidImage,
    name: "---",
    profession: "---",
    careersInterested: "---",
    universityInterestedIn: "---",
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
              <p>{userVisited?.careersInterested}</p>
              <span>Preferencias profesionales</span>
            </div>
            <div className="profile-card-body-block-text">
              <p>{userVisited?.universityInterestedIn}</p>
              <span>Universidades de su interés</span>
            </div>
          </div>
        </div>
        <div className="student-sections">
          <div className="student-qualities">
            <p className="student-qualities-title">Mejores cualidades</p>
            <div className="student-qualities-cards">
              <CardFeature />
              <CardFeature />
              <CardFeature />
            </div>
          </div>
          <div className="student-goals">
            <p className="student-qualities-title">Metas</p>
            <div className="student-qualities-cards">
              <CardFeature />
              <CardFeature />
              <CardFeature />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ProfileStudent;
