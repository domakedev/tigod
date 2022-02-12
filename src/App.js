import "./App.css";
import { useNavigate } from "react-router-dom";
import Header from "./components/layouts/Header/Header.jsx";
import Footer from "./components/layouts/Footer/Footer.jsx";
import CardLanding from "./components/layouts/Cards/CardLanding/CardLanding";

// Images svg
import Professional from "./assets/Landing/profesional.svg";
import Thinking from "./assets/Landing/Thinking.svg";
import Parents from "./assets/Landing/Parents.svg";

function App() {
  const navigate = useNavigate();
  return (
    <div className="page-container">
      <Header />
      <div className="main-content">
        <CardLanding
          image={Professional}
          description="Genera ingresos con tu experiencia"
          buttonText="Muestrame"
          fun={() => {
            navigate("/register");
          }}
        />
        <CardLanding
          image={Thinking}
          description="Descubre tu vocacion y conocela de cerca"
          buttonText="Empecemos"
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
