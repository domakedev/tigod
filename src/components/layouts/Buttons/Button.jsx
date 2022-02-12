import React from "react";
import "./styles.css";

const Button = ({ text = "Button", type = "principal", fun = () => {} }) => {
  return (
    <button type="button" className={`btn btn-${type}`} onClick={fun}>
      {text}
    </button>
  );
};

export default Button;
