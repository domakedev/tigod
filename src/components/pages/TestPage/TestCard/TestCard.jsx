import React from "react";
import "./styles.css";

const TestCard = ({
  title = "Titulo",
  iconImage = "",
  description1 = "",
  description2 = "",
  children, // Acciones como inputs o buttons
}) => {
  return (
    <div className="test-card">
      <h2 className="test-card-title">
        {title}
        <img src={iconImage} alt="" />
      </h2>
      <div className="test-card-description"> {description1}</div>
      <br />
      <div className="test-card-description test-card-description_2"> {description2}</div>
      <div className="test-card-action">{children}</div>
    </div>
  );
};

export default TestCard;
