import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { gql, useQuery } from "@apollo/client";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import "./MiVocacion.css";

// Components
import CardAnuncio from "../../layouts/Cards/CardAnuncio/CardAnuncio";
import Header from "../../layouts/Header/Header";
import Footer from "../../layouts/Footer/Footer";
import CardCareer from "../../layouts/Cards/CardCareer/CardCareer";
import CardProfessional from "../../layouts/Cards/CardProfessional/CardProfessional";
import Button from "../../layouts/Buttons/Button";

// Icon & Images
import Star from "../../../assets/icons/star.svg";
import ElectronicImage from "../../../assets/Career/electronica.jfif";
import SistemasImage from "../../../assets/Career/sistemas.jfif";

const { v4: uuid } = require("uuid");

// Apollo
const OBTENER_USUARIOS = gql`
  query ObtenerUsuarios {
    obtenerUsuarios {
      name
      email
      role
      photo
      profession
      actualWorkPlace
    }
  }
`;

const MiVocacion = () => {
  const navigate = useNavigate();
  const miVocacion = useSelector((state) => state.authUser?.vocation);
  const [myVocationDetails, setMyVocationDetails] = useState({});
  const [professionals, setProfessionals] = useState();

  const { data } = useQuery(OBTENER_USUARIOS);

  const TrabajoTecnologico = {
    description: "Eres una persona con gran pasion por la tecnologia",
    careers: [
      {
        title: "Ingenieria Electronica",
        description: "Diseño e implementacion de electronica",
        image: ElectronicImage,
        goTo: function () {
          navigate("/electronic");
        },
      },
      {
        title: "Ingenieria de Software",
        description: "Diseño e implementacion de sistemas computacionales",
        image: SistemasImage,
        goTo: function () {
          navigate("/sistemas");
        },
      },
    ],
  };

  useEffect(() => {
    if (miVocacion) {
      // Se probo tanto por test como por DB
      switch (miVocacion) {
        case " ":
          break;

        default:
          setMyVocationDetails(TrabajoTecnologico);
          break;
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [miVocacion]);

  // Esta llamada solo mockea data de profesionales
  useEffect(() => {
    if (data?.obtenerUsuarios) {
      const profs = data?.obtenerUsuarios?.filter(
        (e) => e.role === "Profesional"
      );
      setProfessionals(profs);
    }
  }, [data]);

  if (!miVocacion) {
    return (
      <div className="w-full min-h-full flex justify-center items-center">
        <CardAnuncio
          title="Aun no sabemos tu vocación"
          description="Debes ser estudiante"
        >
          <Button
            type="principal"
            text="Has el test primero"
            fun={() => {
              navigate("/");
            }}
          />
        </CardAnuncio>
      </div>
    );
  }

  return (
    <div className="page-container">
      <Header />
      <div className="main-content main-content__mivocacion">
        <CardAnuncio
          icon={Star}
          title="¡Felicidades!"
          description={myVocationDetails?.description}
        />
        <div className="mivocacion-careers">
          <p className="careers-title">
            Estas son las carreras que mas se ajustan a tu vocación
          </p>
          <div className="careers-cards">
            {myVocationDetails?.careers?.map((c, i) => (
              <CardCareer
                key={uuid()}
                title={c.title}
                image={c.image}
                description={c.description}
                fun={() => {
                  Swal.fire({
                    title:
                      "Pronto podras ver las carreras mas importantes de tu país.",
                    // text: "Selecciona tu perfil por esta sesión",
                    icon: "info",
                    confirmButtonText: "Ok",
                  });
                }}
              />
            ))}
          </div>
        </div>

        <div className="mivocacion-professionals">
          <p className="professionals-title">
            Contacta a estos profesionales que han trabajado en tu carrera y
            país
          </p>
          <div className="professionals-cards">
            {professionals?.map((e, i) => (
              <CardProfessional
                key={uuid()}
                image={e?.photo}
                name={e?.name}
                profession={e?.profession}
                place={e?.actualWorkPlace}
                email={e?.email}
              />
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default MiVocacion;
