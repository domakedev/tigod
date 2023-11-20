import React, { useState } from "react";
import { useSelector } from "react-redux";
import { ChatEngine, getOrCreateChat } from "react-chat-engine";

import "./CardChat.css";
import CardAnuncio from "../CardAnuncio/CardAnuncio";
import Button from "../../Buttons/Button";

const CardChat = () => {
  // eslint-disable-next-line no-unused-vars
  const [username, setUsername] = useState("");
  const chatToUser = useSelector((state) => state?.chatTo);
  const chatUsername = useSelector((state) => state?.authUser?.chatUsername);
  const chatUserSecret = useSelector(
    (state) => state?.authUser?.chatUserSecret
  );

  function createDirectChat(creds) {
    getOrCreateChat(
      creds,
      { is_direct_chat: true, usernames: [chatToUser?.email] },
      () => setUsername("")
    );
  }

  function renderChatForm(creds) {
    return (
      <div>
        {chatToUser?.name ? (
          <Button
            fun={() => createDirectChat(creds)}
            text={`Iniciar CHAT con: ${chatToUser?.name}`}
            type="principal"
          ></Button>
        ) : (
          <Button
            text="Chat premium DESACTIVADO, solo disponible con suscripción de pago"
            type="alert"
          ></Button>
        )}
      </div>
    );
  }

  if (chatUsername === undefined && chatUserSecret === undefined) {
    return (
      <div className="w-full min-h-full flex justify-center items-center">
        <CardAnuncio
          title="Cargando chat"
          description="Por favor espera"
        ></CardAnuncio>
      </div>
    );
  }

  return (
    <ChatEngine
      height="calc( 100vh - 139px)"
      projectID={process.env.REACT_APP_CHAT_PROJECT_ID}
      userName={chatUsername}
      userSecret={chatUserSecret}
      renderNewChatForm={(creds) => renderChatForm(creds)}
    />
  );
};

export default CardChat;
