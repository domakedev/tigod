import React from "react";
import Switch from "../../../layouts/Inputs/Switch/Switch";

const CardConnection = ({ fun, status }) => {
  return (
    <div className="config-card">
      <p className="config-card-title">Estado de conexión</p>
      <Switch fun={fun} status={status}/>
    </div>
  );
};

export default CardConnection;
