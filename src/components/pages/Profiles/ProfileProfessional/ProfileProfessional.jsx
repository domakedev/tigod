import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import "./ProfileProfessional.css";

// Redux
import actions from "../../../../store/actions";

// Images
import RegisterHeader from "../../../../assets/RegisterHeader.svg";
import VoidImage from "../../../../assets/void.png";
import ChatIcon from "../../../../assets/icons/chat.svg";

// Components
import Header from "../../../layouts/Header/Header";
import Footer from "../../../layouts/Footer/Footer";

// Apollo
import { useQuery, gql } from "@apollo/client";
import CardMap from "../../../layouts/Cards/CardMap/CardMap";
const OBTENER_USUARIO = gql`
  query obtenerUsuario($email: String!) {
    obtenerUsuario(email: $email) {
      id
      name
      email
      role
      photo
      isOnline
      workPlaces
    }
  }
`;

const ProfileProfessional = () => {
  const authUser = useSelector((state) => state.authUser);
  const params = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const email = params.email;
  const { data } = useQuery(OBTENER_USUARIO, {
    variables: {
      email,
    },
    skip: !email.includes("@"),
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const realUser = data?.obtenerUsuario;

  const userVisited = {
    image: VoidImage,
    name: "---",
    profession: "---",
    actualWorkPlace: "---",
    yearsOfExperience: "---",
    numberOfWorks: "---",
    citiesOfWork: "---",
  };

  if (realUser?.role !== "Profesional") {
    navigate("/");
  }

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
              <p>{realUser?.workPlaces?.length}</p>
              <span>Ciudades donde ha trabajado</span>
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
          <img
            className="profile-card-mini-image"
            src={ChatIcon}
            alt=""
            onClick={async () => {
              await dispatch(actions.setProToChat(realUser));
              navigate("/chat");
            }}
          />
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
                <p className="experience-texts-occupation">Puesto</p>
                <p className="experience-texts-company">Empresa</p>
                <div className="experience-texts-times">
                  <p className="experience-texts-times">2011</p>
                  <span>-</span>
                  <p className="experience-texts-times">2018</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <CardMap proWorkPlaces={realUser?.workPlaces} />
      </div>
      <Footer />
    </div>
  );
};

export default ProfileProfessional;
