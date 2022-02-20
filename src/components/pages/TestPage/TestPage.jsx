import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import actions from "../../../store/actions";
import Button from "../../layouts/Buttons/Button";
import Header from "../../layouts/Header/Header";
import Footer from "../../layouts/Footer/Footer";
import TestCard from "./TestCard/TestCard";

import "./styles.css";
import StarIcon from "../../../assets/icons/arrowStar.png";
import Campo from "../../../assets/test/campo.png";
import Ciudad from "../../../assets/test/ciudad.png";
import What from "../../../assets/test/what.png";
import Who from "../../../assets/test/who.png";
import CardAnuncio from "../../layouts/Cards/CardAnuncio/CardAnuncio";

// Apollo Client
import { gql, useMutation } from "@apollo/client";
const ACTUALIZAR_USUARIO = gql`
  mutation actualizarUsuario($email: String, $input: UsuarioInput) {
    actualizarUsuario(email: $email, input: $input) {
      vocation
    }
  }
`;

const TestPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const authUserEmail = useSelector((state) => state?.authUser?.email);
  const authUserRole = useSelector((state) => state?.authUser?.role);
  const [actualizarUsuario] = useMutation(ACTUALIZAR_USUARIO);

  // States
  const [visibleCard, setVisibleCard] = useState([
    [0, true],
    [1, false],
    [2, false],
    [3, false],
  ]);
  const [ciudadCampo, setCiudadCampo] = useState("");
  const [whoWhat, setWhoWhat] = useState("");

  const configVisible = async (actualCard, nextCard) => {
    if (nextCard === visibleCard.length) {
      // Definir vocacion segun respuestas
      let myVocationOneLine = "Pendiente hacer calculos 4";

      if (ciudadCampo === "test-campo" && whoWhat === "test-what") {
        myVocationOneLine = "trabajo-rural";
      }
      if (ciudadCampo === "test-campo" && whoWhat === "test-who") {
        myVocationOneLine = "trabajo-ambiental";
      }
      if (ciudadCampo === "test-ciudad" && whoWhat === "test-what") {
        myVocationOneLine = "trabajo-tecnologico";
      }
      if (ciudadCampo === "test-ciudad" && whoWhat === "test-who") {
        myVocationOneLine = "trabajo-salud";
      }

      const miVocacion = {
        vocation: myVocationOneLine,
      };

      // Guardar Vocacion en DB con Apollo
      try {
        // eslint-disable-next-line no-unused-vars
        const { data } = await actualizarUsuario({
          variables: {
            email: authUserEmail,
            input: miVocacion,
          },
        });

        // Guardar Vocacion en FRONTEND

        dispatch(actions.saveMyVocation(myVocationOneLine));

        // Finalmente se va a la pagina de mi vocacion
        navigate("/mivocacion");
      } catch (error) {
        console.log("🚀 ~ file: TestPage.jsx ~ line 68 ~ error", error);
      }
      return;
    }
    const copia = [...visibleCard];
    copia[actualCard][1] = false;
    copia[nextCard][1] = true;

    setVisibleCard(copia);
  };

  const onChangeCiudadCampo = (e) => {
    const name = e.target.id;

    setCiudadCampo(name);
    configVisible(1, 2);
  };

  const onChangeWhoWhat = (e) => {
    const name = e.target.id;
    setWhoWhat(name);
    configVisible(2, 3);
  };

  if (authUserRole !== "Estudiante") {
    return (
      <div className="w-full min-h-full flex justify-center items-center">
        <CardAnuncio
          title="Para tomar el test debes ser un estudiante"
          description=" "
        ></CardAnuncio>
      </div>
    );
  }

  return (
    <div className="page-container">
      <Header />
      <div className="main-content-test">
        {/* Card 0 de inicio*/}
        {visibleCard[0][1] === true && (
          <TestCard
            title="¡Empecemos!"
            description1="Son preguntas cortas, responde con la verdad."
            description2="Al terminar veras tu vocacion ideal."
            iconImage={StarIcon}
          >
            <Button
              text="Iniciar"
              type="principal"
              fun={() => configVisible(0, 1)}
            />
          </TestCard>
        )}

        {/* Card 1 */}
        {visibleCard[1][1] === true && (
          <TestCard
            title="Tu lugar perfecto"
            description1="Ganaste un viaje de 1 mes, lejos de tu familia y amigos, ¿Cual seria tu destino?"
          >
            <label htmlFor="test-ciudad">
              <img src={Ciudad} alt="" />
              <input
                type="radio"
                name="test-ciudad-campo"
                id="test-ciudad"
                checked={ciudadCampo === "test-ciudad"}
                onChange={(e) => onChangeCiudadCampo(e)}
              />{" "}
              Ciudad
            </label>

            <label htmlFor="test-campo">
              <img src={Campo} alt="" />
              <input
                type="radio"
                name="test-ciudad-campo"
                id="test-campo"
                checked={ciudadCampo === "test-campo"}
                onChange={(e) => onChangeCiudadCampo(e)}
              />{" "}
              Campo
            </label>

            {/* <Button
              text="Iniciar"
              type="principal"
              fun={() => configVisible(1, 2)}
            /> */}
          </TestCard>
        )}

        {/* Card 2 */}
        {visibleCard[2][1] === true && (
          <TestCard
            title="¿Con quien o con que?"
            description1="Tienes 2  problemas en tu hogar: la TV no enciente y tu vecino se lastimó, cual problema preferirias resolver."
          >
            <label htmlFor="test-who">
              <img src={Who} alt="ayudar-al-niño" />
              <input
                type="radio"
                name="test-who-what"
                id="test-who"
                onChange={onChangeWhoWhat}
                checked={whoWhat === "test-who"}
              />{" "}
              Sanar
            </label>

            <label htmlFor="test-what">
              <img src={What} alt="ayudar-al-niño" />
              <input
                type="radio"
                name="test-who-what"
                id="test-what"
                onChange={onChangeWhoWhat}
                checked={whoWhat === "test-what"}
              />{" "}
              Reparar
            </label>
          </TestCard>
        )}

        {/* Card 3 de Fin*/}
        {visibleCard[3][1] === true && (
          <TestCard
            title="¡Has terminado!"
            description1="Veras las profesiones para ti y las personas que te ayudaran a decidir."
            description2="Tu vocacion ideal"
          >
            <Button
              text="Enviar mi Test"
              type="success"
              fun={() => configVisible(3, 4)}
            />
          </TestCard>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default TestPage;
