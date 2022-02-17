import React, { useState } from "react";

import { ChatEngine, getOrCreateChat } from "react-chat-engine";

import "./CardChat.css";

const DirectChatPage = () => {
  const [username, setUsername] = useState("");

  function createDirectChat(creds) {
    getOrCreateChat(
      creds,
      { is_direct_chat: true, usernames: [username] },
      () => setUsername("")
    );
  }

  function renderChatForm(creds) {
    return (
      <div>
        <input
          className="chat-search-user"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <button onClick={() => createDirectChat(creds)}>Createx</button>
      </div>
    );
  }

  return (
    <ChatEngine
      height="calc( 100vh - 139px)"
      projectID="9d190663-8100-46a4-b72e-2a7f0d78a034"
      userName="domakedev"
      userSecret="asd321@"
      renderNewChatForm={(creds) => renderChatForm(creds)}
    />
  );
};

export default DirectChatPage;
