import React from "react";
import "./Switch.css";

const Switch = ({ fun = () => {}, disabled = false, status = false }) => {
  const onChangeHandler = (e) => {
    fun(e.target.checked);
  };
  return (
    <div className="input-switch">
      <input
        className="sw_dark_mode_input"
        type="checkbox"
        name=""
        id="checkbox"
        checked={status}
        onChange={onChangeHandler}
        disabled={disabled}
      />
      <label className="sw_dark_mode_label" htmlFor="checkbox">
        {/* Textos para extremos */}
        {/* <div class="textito_light">Light Mode</div>
        <div class="textito_dark">Dark Mode</div> */}
      </label>
    </div>
  );
};

export default Switch;
