import React, { useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import Header from "./components/layouts/Header/Header.jsx";
import Footer from "./components/layouts/Footer/Footer.jsx";
import CardLanding from "./components/layouts/Cards/CardLanding/CardLanding";
import "./App.css";

// Apollo
import { useQuery, gql, useMutation } from "@apollo/client";

// Images svg
import Professional from "./assets/Landing/profesional.svg";
import Thinking from "./assets/Landing/Thinking.svg";
import Parents from "./assets/Landing/Parents.svg";

const OBTENER_USUARIO = gql`
  query obtenerUsuario($email: String!) {
    obtenerUsuario(email: $email) {
      id
      name
      role
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
    }
  }
`;

function App() {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth0();
  const [registrarUsuario] = useMutation(REGISTRAR_USUARIO);
  console.log("🚀 ~ file: App.js ~ line 42 ~ isAuthenticated", isAuthenticated);

  const email = user?.email;
  const { data } = useQuery(OBTENER_USUARIO, {
    variables: {
      email,
    },
    skip: !user?.email.includes("@"),
  });
  console.log("🚀 ~ file: App.js ~ line 51 ~ data", data);

  useEffect(() => {
    if (
      data === undefined &&
      isAuthenticated &&
      !localStorage.getItem("session")
    ) {
      // Usuario registrado en TIGOD pero no en la DB
      // Registrar usuario en la DB
      const registrarEsteUsuario = async () => {
        try {
          const { data } = await registrarUsuario({
            variables: {
              input: {
                email: user.email,
                name: user.name,
                photo: user.picture || "Sin foto por ahora",
                role: "vacio",
              },
            },
          });
          localStorage.setItem("session", email);
          console.log("🚀 ~ file: App.js ~ line 60 ~ data", data);
          Swal.fire({
            title: "Ingreso exitoso",
            // text: "Selecciona tu perfil por esta sesión",
            icon: "success",
            confirmButtonText: "Ok",
          });
          navigate("/registro");
        } catch (error) {
          console.log("🚀 ~ file: App.js ~ line 87 ~ error", error);
        }
      };
      registrarEsteUsuario();
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
        />
        <CardLanding
          image={Thinking}
          description="Descubre tu vocacion y conocela de cerca"
          buttonText="Empecemos"
          fun={() => {
            navigate("/test");
          }}
        />
        <CardLanding
          image={Parents}
          description="Ayuda a tus hijos a descubrir su vocacion"
          buttonText="Saber más"
        />
      </div>
      <Footer />
    </div>
  );
}

export default App;
