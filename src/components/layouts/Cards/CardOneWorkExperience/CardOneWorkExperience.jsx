import React from "react";

const CardOneWorkExperience = () => {
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
      />
      <label className="config-card-label" htmlFor="empresa">
        Empresa
      </label>
      <input type="text" id="empresa" placeholder="Nombre de la empresa" />
      <p className="config-card-label">Tiempo</p>
      <label htmlFor="tInicial">Inicio</label>
      <input
        className="exp-inicio"
        type="date"
        id="tInicial"
        placeholder="Fecha Inicio"
      />
      <label htmlFor="tFinal">Fin</label>
      <input
        className="exp-fin"
        type="date"
        id="tFinal"
        placeholder="Fecha Fin"
      />
      <p className="config-card-label">Sector</p>
      <input type="checkbox" name="upao" id="sector" />
      <label htmlFor="sector"> Sector1</label>
    </div>
  );
};

export default CardOneWorkExperience;
