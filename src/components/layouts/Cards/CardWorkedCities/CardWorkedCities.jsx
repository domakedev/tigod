import React from "react";

const CardWorkedCities = () => {
  return (
    <div className="config-card">
      <p className="config-card-title config-card-title_universities">
        Ciudades en las que laboraste
      </p>
      <div className="config-card_universities">
        <label htmlFor="u1">
          <input type="checkbox" name="upao" id="u1" />
          Ciudad1
        </label>
        <label htmlFor="u2">
          <input type="checkbox" name="upao" id="u2" />
          Ciudad2
        </label>
      </div>
    </div>
  );
};

export default CardWorkedCities;
