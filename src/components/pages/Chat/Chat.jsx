import React from "react";
import "./Chat.css";
import CardChat from "../../layouts/Cards/CardChat/CardChat";
import Header from "../../layouts/Header/Header";
import Footer from "../../layouts/Footer/Footer";
import { useAuth0 } from "@auth0/auth0-react";
import Button from "../../layouts/Buttons/Button";

const Chat = () => {
  const { loginWithRedirect, isAuthenticated } = useAuth0();

  if (!isAuthenticated) {
    return (
      <div className="page-container">
        <h1>Por favor inicia sesión o registrate primero</h1>
        <Button
          text="Iniciar Sesión"
          type="secondary"
          fun={() => {
            loginWithRedirect({ returnTo: window.location.origin });
          }}
          hidden
        />
        <Button
          text="Registrarme"
          type="principal"
          fun={() => {
            loginWithRedirect({ screen_hint: "signup" });
          }}
          hidden
        />
      </div>
    );
  }

  return (
    <div className="page-container">
      <Header />
      <div className="main-content main-content_chat">
        <CardChat />
      </div>
      <Footer />
    </div>
  );
};

export default Chat;
