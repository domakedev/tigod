import React from "react";
import "./Switch.css";

const Switch = () => {
  return (
    <div className="input-switch">
      <input class="sw_dark_mode_input" type="checkbox" name="" id="checkbox" />
      <label class="sw_dark_mode_label" htmlFor="checkbox">
        {/* Textos para extremos */}
        {/* <div class="textito_light">Light Mode</div>
        <div class="textito_dark">Dark Mode</div> */}
      </label>
    </div>
  );
};

export default Switch;
