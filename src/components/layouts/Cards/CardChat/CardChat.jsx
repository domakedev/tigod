import React, { useState } from "react";
import { useSelector } from "react-redux";

import { ChatEngine, getOrCreateChat } from "react-chat-engine";

import "./CardChat.css";

const CardChat = () => {
  // eslint-disable-next-line no-unused-vars
  const [username, setUsername] = useState("");
  const chatToEmail = useSelector((state) => state.chatTo);

  console.log("🚀 ~ file: CardChat.jsx ~ line 9 ~ chatToEmail", chatToEmail);

  function createDirectChat(creds) {
    getOrCreateChat(
      creds,
      { is_direct_chat: true, usernames: [chatToEmail] },
      () => setUsername("")
    );
  }

  function renderChatForm(creds) {
    return (
      <div>
        {/* <input
          className="chat-search-user"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        /> */}
        {chatToEmail ? (
          <button
            className="chat-button_start-chat"
            onClick={() => createDirectChat(creds)}
          >
            Iniciar CHAT con: {chatToEmail}
          </button>
        ) : null}
      </div>
    );
  }

  return (
    <ChatEngine
      height="calc( 100vh - 139px)"
      projectID={process.env.REACT_APP_CHAT_PROYECT_ID}
      userName="domakedev"
      userSecret="asd321@"
      renderNewChatForm={(creds) => renderChatForm(creds)}
    />
  );
};

export default CardChat;
