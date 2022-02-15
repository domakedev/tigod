import "./App.css";
import { useNavigate } from "react-router-dom";
import Header from "./components/layouts/Header/Header.jsx";
import Footer from "./components/layouts/Footer/Footer.jsx";
import CardLanding from "./components/layouts/Cards/CardLanding/CardLanding";

// Apollo
import { useQuery, gql } from "@apollo/client";

// Images svg
import Professional from "./assets/Landing/profesional.svg";
import Thinking from "./assets/Landing/Thinking.svg";
import Parents from "./assets/Landing/Parents.svg";

const OBTENER_ESTUDIANTE = gql`
  query obtenerEstudiante($id: ID!) {
    obtenerEstudiante(id: $id) {
      id
      name
    }
  }
`;

function App() {
  const id = "620b05204f2f09b57b3ea3b7";
  const { loading, error, data } = useQuery(OBTENER_ESTUDIANTE, {
    variables: {
      id,
    },
  });
  console.log("🚀 ~ file: App.js ~ line 23 ~ data", data);
  console.log("🚀 ~ file: App.js ~ line 23 ~ error", error);
  console.log("🚀 ~ file: App.js ~ line 23 ~ loading", loading);

  const navigate = useNavigate();
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
