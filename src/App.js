import React, { useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";
import axios from "axios";
import Header from "./components/layouts/Header/Header.jsx";
import Footer from "./components/layouts/Footer/Footer.jsx";
import CardLanding from "./components/layouts/Cards/CardLanding/CardLanding";
import actions from "./store/actions";
import "./App.css";

// Apollo
import { useQuery, gql, useMutation } from "@apollo/client";

// Images svg
import Professional from "./assets/Landing/profesional.svg";
import Thinking from "./assets/Landing/Thinking.svg";
import Parents from "./assets/Landing/Parents.svg";
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
    }
  }
`;
const REGISTRAR_USUARIO = gql`
  mutation registrarUsuario($input: UsuarioInput) {
    registrarUsuario(input: $input) {
      id
      name
      email
      role
      chatUsername
      chatUserSecret
    }
  }
`;

const AUTENTICAR_USUARIO = gql`
  mutation autenticarUsuario($input: UsuarioInput) {
    autenticarUsuario(input: $input) {
      user {
        email
        role
        isOnline
        photo
      }
      token
    }
  }
`;

function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth0();
  const [registrarUsuario] = useMutation(REGISTRAR_USUARIO);
  const [autenticarUsuario] = useMutation(AUTENTICAR_USUARIO);

  const email = user?.email;
  const { data } = useQuery(OBTENER_USUARIO, {
    variables: {
      email,
    },
    skip: !user?.email.includes("@"),
  });

  const autenticarEsteUsuario = async () => {
    try {
      const { data } = await autenticarUsuario({
        variables: {
          input: {
            email: user.email,
            isAuth: isAuthenticated,
          },
        },
      });
      localStorage.setItem("token", data?.autenticarUsuario?.token);
    } catch (error) {
      console.log("🚀 ~ file: App.js ~ line 155 ~ error", error);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (
      data === undefined &&
      isAuthenticated &&
      !localStorage.getItem("token")
    ) {
      // Usuario registrado en TIGOD pero no en la DB
      // Registrar usuario en la DB

      const registrarEsteUsuario = async () => {
        try {
          const chatUserSecret = uuid();
          // eslint-disable-next-line no-unused-vars
          const { data } = await registrarUsuario({
            variables: {
              input: {
                email: user.email,
                name: user.name,
                photo: user.picture || "Sin foto por ahora",
                role: "vacio",
                chatUsername: user.email,
                chatUserSecret: chatUserSecret,
              },
            },
          });

          console.log("aqui");

          // Registrar en CHAT ENGINE BACKEND
          let dataChatEngine = {
            username: user.email,
            secret: chatUserSecret,
            email: user.email,
            first_name: user.name,
          };

          var config = {
            method: "post",
            url: "https://api.chatengine.io/users/",
            headers: {
              "PRIVATE-KEY": `{{${process.env.REACT_APP_CHAT_PRIVATE_KEY}}}`,
            },
            data: dataChatEngine,
          };

          axios(config)
            .then(function (response) {
              console.log(
                "Respuesta de Chat Engine",
                JSON.stringify(response.data)
              );
            })
            .catch(function (error) {
              console.log(error);
            });

          // FIN Registrar en CHAT ENGINE BACKEND
          dispatch(actions.saveAuthUser(data?.registrarUsuario));
          autenticarEsteUsuario();
          navigate("/registro");
        } catch (error) {
          // console.log("🚀 ~ file: App.js ~ line 87 ~ error", error);
        }
      };
      registrarEsteUsuario();
    }

    if (data !== undefined && isAuthenticated && user) {
      // Entra aqui si ya esta registrado y autenticado, pediremos el token
      // Y guardaremos el tokencitox
      console.log("o aqui?");
      autenticarEsteUsuario();
      dispatch(actions.saveAuthUser(data.obtenerUsuario));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, user, isAuthenticated]);

  return (
    <div className="page-container">
      <Header />
      <div className="main-content-landing">
        <CardLanding
          image={Professional}
          description="Genera ingresos con tu experiencia"
          buttonText="Muestrame"
          fun={() => {
            Swal.fire({
              title: "Pronto implementaremos esta funcion",
              // text: "Selecciona tu perfil por esta sesión",
              icon: "info",
              confirmButtonText: "Ok",
            });
          }}
        />
        <CardLanding
          image={Thinking}
          description="Descubre tu vocacion y conocela de cerca"
          buttonText="Empecemos con el test"
          fun={() => {
            navigate("/test");
          }}
        />
        <CardLanding
          image={Parents}
          description="Ayuda a tus hijos a descubrir su vocacion"
          buttonText="Saber más"
          fun={() => {
            Swal.fire({
              title: "Pronto implementaremos esta funcion",
              // text: "Selecciona tu perfil por esta sesión",
              icon: "info",
              confirmButtonText: "Ok",
            });
          }}
        />
      </div>
      <Footer />
    </div>
  );
}

export default App;
