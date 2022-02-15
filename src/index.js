import React from "react";
import { render } from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Auth0Provider } from "@auth0/auth0-react";
import "./index.css";

// Apollo GraphQL
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
} from "@apollo/client";

// Pages
import App from "./App";
import TestPage from "./components/pages/TestPage/TestPage";
// import Register from "./components/pages/Register/Register.jsx";
import NotFound from "./components/pages/P404/P404.jsx";
import MiVocacion from "./components/pages/MiVocacion/MiVocacion.jsx";
import ProfileStudent from "./components/pages/Profiles/ProfileStudent/ProfileStudent.jsx";
import ProfileStudentConfig from "./components/pages/Profiles/ProfileStudentConfig/ProfileStudentConfig";
import ProfileProfessional from "./components/pages/Profiles/ProfileProfessional/ProfileProfessional";
import ProfileProfessionalConfig from "./components/pages/Profiles/ProfileProfessionalConfig/ProfileProfessionalConfig";

const client = new ApolloClient({
  uri: "http://localhost:4000/",
  cache: new InMemoryCache(),
});

render(
  <Auth0Provider
    domain={`${process.env.REACT_APP_DOMAIN}`}
    clientId={`${process.env.REACT_APP_CLIENTID}`}
    redirectUri={window.location.origin}
  >
    <ApolloProvider client={client}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/test" element={<TestPage />} />
          <Route path="/mivocacion" element={<MiVocacion />} />
          <Route
            path="/miperfil/estudiante/:email"
            element={<ProfileStudent />}
          />
          <Route
            path="/miperfil/estudiante/config"
            element={<ProfileStudentConfig />}
          />
          <Route
            path="/miperfil/profesional/:email"
            element={<ProfileProfessional />}
          />
          <Route
            path="/miperfil/profesional/config"
            element={<ProfileProfessionalConfig />}
          />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </ApolloProvider>
  </Auth0Provider>,
  document.getElementById("root")
);
