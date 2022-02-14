import React from "react";
import { useParams } from "react-router-dom";
import "./ProfileStudent.css";

// Components
import Header from "../../../layouts/Header/Header";
import Footer from "../../../layouts/Footer/Footer";
import CardFeature from "../../../layouts/Cards/CardFeature/CardFeature";

// Images
import RegisterHeader from "../../../../assets/RegisterHeader.svg";
import VoidImage from "../../../../assets/void.png";

const ProfileStudent = () => {
  const userVisited = {
    image: VoidImage,
    name: "Nombre",
    profession: "Profesion",
    careersInterested: "Carrera 1",
    universityInterestedIn: "Universidad 1",
  };
  const params = useParams();
  console.log("🚀 ~ file: ProfileStudent.jsx ~ line 6 ~ params", params);

  return (
    <div className="page-container">
      <Header />
      <div className="main-content profile-student-container">
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
            <img
              src={userVisited?.image}
              alt=""
              className="profile-card-body-image"
            />
            <div className="profile-card-body-block-text">
              <p>{userVisited?.name}</p>
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
