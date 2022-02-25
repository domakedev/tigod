import React, { useState } from "react";
import Button from "../../Buttons/Button";
import "./CardOneWorkExperience.css";

const CardOneWorkExperience = ({
  fun = {},
  cargo = "",
  empresa = "",
  inicio = "0",
  fin = "0",
  eliminarOption = false,
}) => {
  const actualYear = new Date().getFullYear();
  const [experience, setExperience] = useState({
    cargo: cargo,
    empresa: empresa,
    inicio: inicio,
    fin: fin,
  });

  const changeHandler = (e) => {
    setExperience({
      ...experience,
      [e.target.id]: e.target.value,
    });
  };
  return (
    <div className="config-card">
      <p className="config-card-title config-card-title_universities">
        Experiencia Laboral
      </p>

      <label className="config-card-label" htmlFor="cargo">
        Cargo
      </label>
      <input
        type="text"
        id="cargo"
        placeholder="Posición dentro de la empresa"
        value={experience.cargo}
        onChange={changeHandler}
      />

      <label className="config-card-label" htmlFor="empresa">
        Empresa
      </label>
      <input
        type="text"
        id="empresa"
        placeholder="Nombre de la empresa"
        value={experience.empresa}
        onChange={changeHandler}
      />

      <p className="config-card-label">Tiempo</p>
      <label htmlFor="inicio">Inicio</label>
      <input
        className="exp-inicio"
        type="number"
        min={actualYear - 60}
        max={actualYear}
        id="inicio"
        placeholder="Fecha Inicio"
        value={experience.inicio}
        onChange={changeHandler}
      />

      <label htmlFor="fin">Fin</label>
      <input
        className="exp-fin"
        type="number"
        min={actualYear - 60}
        max={actualYear}
        id="fin"
        placeholder="Fecha Fin"
        value={experience.fin}
        onChange={changeHandler}
      />
      {/* <p className="config-card-label">Sector</p>
      <input type="checkbox" name="upao" id="sector" />
      <label htmlFor="sector"> Sector1</label> */}
      <div className="card-exp-centrar-btn">
        {eliminarOption ? (
          <Button
            type="alert"
            text="Quitar experiencia"
            fun={() => fun(experience)}
          />
        ) : (
          <Button
            type="secondary"
            text="Añadir experiencia"
            fun={() => {
              setExperience({
                cargo: "",
                empresa: "",
                inicio: 0,
                fin: 0,
              });
              fun(experience);
            }}
          />
        )}
      </div>
    </div>
  );
};

export default CardOneWorkExperience;
