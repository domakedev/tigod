import React from "react";
import "./styles.css";

const TestCard = ({
  title = "Titulo",
  description = "Descripcion X",
  children,
}) => {
  return (
    <div className="test-card">
      <h2 className="test-card-title">{title}</h2>
      <div className="test-card-description"> {description}</div>
      <div className="action">{children}</div>
    </div>
  );
};

export default TestCard;
