import React from "react";
import { render } from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Auth0Provider } from "@auth0/auth0-react";
import { Provider } from "react-redux";
import client from "./config/apollo";
import store from "./store";

import "./index.css";

// Apollo GraphQL
import { ApolloProvider } from "@apollo/client";

// Pages
import App from "./App";
import TestPage from "./components/pages/TestPage/TestPage";
import Register from "./components/pages/Register/Register.jsx";
import NotFound from "./components/pages/P404/P404.jsx";
import MiVocacion from "./components/pages/MiVocacion/MiVocacion.jsx";
import ProfileStudent from "./components/pages/Profiles/ProfileStudent/ProfileStudent.jsx";
import ProfileStudentConfig from "./components/pages/Profiles/ProfileStudentConfig/ProfileStudentConfig";
import ProfileProfessional from "./components/pages/Profiles/ProfileProfessional/ProfileProfessional";
import ProfileProfessionalConfig from "./components/pages/Profiles/ProfileProfessionalConfig/ProfileProfessionalConfig";
import Chat from "./components/pages/Chat/Chat.jsx";

render(
  <Auth0Provider
    domain={`${process.env.REACT_APP_DOMAIN}`}
    clientId={`${process.env.REACT_APP_CLIENTID}`}
    redirectUri={window.location.origin}
  >
    <ApolloProvider client={client}>
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<App />} />
            <Route path="/test" element={<TestPage />} />
            <Route path="/mivocacion" element={<MiVocacion />} />
            <Route path="/registro" element={<Register />} />
            <Route path="/chat" element={<Chat />} />

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
        </BrowserRouter>{" "}
      </Provider>
    </ApolloProvider>
  </Auth0Provider>,
  document.getElementById("root")
);
