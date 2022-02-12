import React from "react";
import "./styles.css";

const Button = ({
  text = "Button",
  type = "principal",
  fun = () => {},
  hidden,
}) => {
  return (
    <button
      type="button"
      className={`btn btn-${type} ${hidden ? "hidden" : ""}`}
      onClick={fun}
    >
      {text}
    </button>
  );
};

export default Button;
