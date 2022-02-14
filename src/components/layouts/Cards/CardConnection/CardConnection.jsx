import React from "react";
import Switch from "../../../layouts/Inputs/Switch/Switch";

const CardConnection = ({ connectionState, setConnectionState }) => {
  return (
    <div className="config-card">
      <p className="config-card-title">Estado de conexión</p>
      <Switch fun={setConnectionState} />
    </div>
  );
};

export default CardConnection;
