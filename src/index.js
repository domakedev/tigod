import React from "react";
import { render } from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import App from "./App";
import TestPage from "./components/pages/TestPage/TestPage";
import Register from "./components/pages/Register/Register.jsx";
import NotFound from "./components/pages/P404/P404.jsx";
import MiVocacion from "./components/pages/MiVocacion/MiVocacion.jsx";
import { Auth0Provider } from "@auth0/auth0-react";

render(
  <Auth0Provider
    domain="dev-z90xuxai.us.auth0.com"
    clientId="6SSh5YK5UIcMqTowjFT1u2igaIpb8gh9"
    redirectUri={window.location.origin}
  >
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/test" element={<TestPage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/mivocacion" element={<MiVocacion />} />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  </Auth0Provider>,
  document.getElementById("root")
);
