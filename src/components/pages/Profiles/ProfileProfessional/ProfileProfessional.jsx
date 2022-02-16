import React from "react";
import { useParams } from "react-router-dom";
import "./ProfileProfessional.css";

// Images
import RegisterHeader from "../../../../assets/RegisterHeader.svg";
import VoidImage from "../../../../assets/void.png";
import ChatIcon from "../../../../assets/icons/chat.svg";

// Components
import Header from "../../../layouts/Header/Header";
import Footer from "../../../layouts/Footer/Footer";

// Apollo
import { useQuery, gql } from "@apollo/client";
const OBTENER_USUARIO = gql`
  query obtenerUsuario($email: String!) {
    obtenerUsuario(email: $email) {
      id
      name
      role
      photo
      isOnline
    }
  }
`;

const ProfileProfessional = () => {
  const params = useParams();

  const email = params.email;
  const { loading, error, data } = useQuery(OBTENER_USUARIO, {
    variables: {
      email,
    },
    skip: !email.includes("@"),
  });

  console.log(
    "🚀 ~ file: ProfileStudent.jsx ~ line 32 ~ loading, error, data",
    loading,
    error,
    data?.obtenerUsuario
  );

  const realUser = data?.obtenerUsuario;

  console.log("🚀 ~ file: ProfileProfessional.jsx ~ line 16 ~ params", params);

  const userVisited = {
    image: VoidImage,
    name: "Nombre",
    profession: "Profesion",
    actualWorkPlace: "WORKPLACE",
    yearsOfExperience: 7,
    numberOfWorks: 5,
    citiesOfWork: "Ciudad1",
  };
  return (
    <div className="page-container">
      <Header />
      <div className="main-content main-content_profile-professional">
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
            <div className="profile-card-body-image">
              <img src={realUser?.photo} alt="" />

              <div
                className={
                  realUser?.isOnline
                    ? "profile-status_on"
                    : "profile-status_off"
                }
              ></div>
            </div>
            <div className="profile-card-body-nt">
              <img src={userVisited?.image} alt="" />
              <img src={userVisited?.image} alt="" />
            </div>
            <div className="profile-card-body-block-text">
              <p>{realUser?.name}</p>
              <span>{realUser?.role}</span>
            </div>
            <div className="profile-card-body-block-text">
              <p>{userVisited?.actualWorkPlace}</p>
              <span>Lugar de trabajo actual</span>
            </div>
            <div className="profile-card-body-block-text">
              <p>{userVisited?.yearsOfExperience} años</p>
              <span>De experiencia</span>
            </div>
            <div className="profile-card-body-block-text">
              <p>{userVisited?.numberOfWorks} empresas</p>
              <span>Donde ha trabajado</span>
            </div>
            <div className="profile-card-body-block-text">
              <p>{userVisited?.citiesOfWork}</p>
              <span>Lugares donde ha trabajado</span>
            </div>
          </div>
        </div>
        <div className="profile-card-mini">
          <div className="profile-card-mini-texts">
            <p className="profile-card-mini-title">Conversa con el o ella</p>
            <p className="profile-card-mini-description">
              Abre un chat directo
            </p>
          </div>
          <img className="profile-card-mini-image" src={ChatIcon} alt="" />
        </div>
        <div className="profile-card-experience">
          <p className="profile-card-experience-title">Experiencia</p>
          <div className="profile-card-experiences">
            <div className="professional-experience">
              <img
                src={ChatIcon}
                alt=""
                className="professional-experience-icon"
              />
              <div className="professional-experience-texts">
                <p className="experience-texts-occupation">Ocupation</p>
                <p className="experience-texts-company">Company</p>
                <div className="experience-texts-times">
                  <p className="experience-texts-times">2011</p>
                  <span>-</span>
                  <p className="experience-texts-times">2018</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="profile-card-map">
          <p className="profile-card-map-title">Donde ha trabajado</p>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ProfileProfessional;
