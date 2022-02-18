import React, { useState, useEffect } from "react";
import "./CardWorkedCities.css";

const CardWorkedCities = ({ updateWorkPlaces, workPlaces }) => {
 
  const [ciudades, setCiudades] = useState({
    tacna: workPlaces?.includes("tacna"),
    cuzco: workPlaces?.includes("cuzco"),
    trujillo: workPlaces?.includes("trujillo"),
    lima: workPlaces?.includes("lima"),
    iquitos: workPlaces?.includes("iquitos"),
    piura: workPlaces?.includes("piura"),
  });


  const onChangeHandler = (e) => {
    const ciudad = e.target.name;
    const estado = e.target.checked;
    setCiudades({
      ...ciudades,
      [ciudad]: estado,
    });
  };

  // Actualizar ciudades cuando llegue la data de workPlaces
  useEffect(() => {
    //   setCiudades({
    //   tacna: workPlaces?.includes("tacna"),
    //   cuzco: workPlaces?.includes("cuzco"),
    // })
  }, [workPlaces]);

  // Enviar nuevas ciudades al padre
  useEffect(() => {
    const asArray = Object.entries(ciudades);

    const filtered = asArray.filter(([key, value]) => value === true);
    const reFiltered = filtered.map((e) => e[0]);

    updateWorkPlaces(reFiltered);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ciudades]);

  return (
    <div className="config-card">
      <p className="config-card-title config-card-title_universities">
        Ciudades en las que laboraste
      </p>
      <div className="config-card_work-cities">
        <label htmlFor="tacna">
          <input
            type="checkbox"
            name="tacna"
            id="tacna"
            onChange={onChangeHandler}
            checked={ciudades?.tacna}
          />
          {""} Tacna
        </label>
        <label htmlFor="cuzco">
          <input
            type="checkbox"
            name="cuzco"
            id="cuzco"
            onChange={onChangeHandler}
            checked={ciudades.cuzco}
          />
          {""} Cuzco
        </label>
        <label htmlFor="trujillo">
          <input
            type="checkbox"
            name="trujillo"
            id="trujillo"
            onChange={onChangeHandler}
            checked={ciudades.trujillo}
          />
          {""} Trujillo
        </label>
        <label htmlFor="lima">
          <input
            type="checkbox"
            name="lima"
            id="lima"
            onChange={onChangeHandler}
            checked={ciudades.lima}
          />
          {""} lima
        </label>
        <label htmlFor="iquitos">
          <input
            type="checkbox"
            name="iquitos"
            id="iquitos"
            onChange={onChangeHandler}
            checked={ciudades.iquitos}
          />
          {""} Iquitos
        </label>
        <label htmlFor="piura">
          <input
            type="checkbox"
            name="piura"
            id="piura"
            onChange={onChangeHandler}
            checked={ciudades.piura}
          />
          {""} Piura
        </label>
      </div>
    </div>
  );
};

export default CardWorkedCities;
