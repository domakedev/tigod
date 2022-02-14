import React from "react";
import "./ProfileProfessional.css";

// Images
import RegisterHeader from "../../../../assets/RegisterHeader.svg";
import VoidImage from "../../../../assets/void.png";
import ChatIcon from "../../../../assets/icons/chat.svg";

// Components
import Header from "../../../layouts/Header/Header";
import Footer from "../../../layouts/Footer/Footer";

const ProfileProfessional = () => {
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
              ¡Bienvenido al perfil de María!
            </p>
            <p className="profile-card-header-description">
              Esta es su informacion pública
            </p>
            <img
              className="profile-card-header-img"
              src={RegisterHeader}
              alt=""
            />
          </div>
          <div className="profile-card-body">
            <div className="profile-card-body-image">
              <img src={userVisited?.image} alt="" />
              <div className="profile-status"></div>
            </div>
            <div className="profile-card-body-nt">
              <img src={userVisited?.image} alt="" />
              <img src={userVisited?.image} alt="" />
            </div>
            <div className="profile-card-body-block-text">
              <p>{userVisited?.name}</p>
              <span>{userVisited?.profession}</span>
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
