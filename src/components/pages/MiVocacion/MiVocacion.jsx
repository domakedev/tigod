import React from "react";
import CardAnuncio from "../../layouts/Cards/CardAnuncio/CardAnuncio";
import Header from "../../layouts/Header/Header";
import Footer from "../../layouts/Footer/Footer";
import "./MiVocacion.css";

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
          description="Eres una persona con grandes habilidades para el desarrollo de tecnologia"
        />
      </div>
      <Footer />
    </div>
  );
};

export default MiVocacion;
