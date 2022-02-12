import React from "react";
import "./MiVocacion.css";

// Components
import CardAnuncio from "../../layouts/Cards/CardAnuncio/CardAnuncio";
import Header from "../../layouts/Header/Header";
import Footer from "../../layouts/Footer/Footer";
import CardCareer from "../../layouts/Cards/CardCareer/CardCareer";
import CardProfessional from "../../layouts/Cards/CardProfessional/CardProfessional";

// Icon
import Star from "../../../assets/icons/star.svg";

const MiVocacion = () => {
  return (
    <div className="page-container">
      <Header />
      <div className="main-content main-content__mivocacion">
        <CardAnuncio
          icon={Star}
          title="¡Felicidades!"
          description="Eres una persona con grandes habilidades para el desarrollo de tecnología"
        />
        <div className="mivocacion-careers">
          <p className="careers-title">
            Estas son las carreras que mas se ajustan a tu vocación
          </p>
          <div className="careers-cards">
            <CardCareer />
            <CardCareer />
            <CardCareer />
          </div>
        </div>

        <div className="mivocacion-professionals">
          <p className="professionals-title">
            Contacta a estos profesionales que han trabajado en tu carrera y
            país
          </p>
          <div className="professionals-cards">
            <CardProfessional />
            <CardProfessional />
            <CardProfessional />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default MiVocacion;
