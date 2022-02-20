import React from "react";
import "./P404.css";
import Image404 from "../../../assets/404/image404.svg";
import Button from "../../layouts/Buttons/Button";
import { useNavigate } from "react-router-dom";

const P404 = () => {
  const navigate = useNavigate();
  return (
    <div className="page-404">
      <img className="page-404-img" src={Image404} alt="Pagina 404" />
      <p>Pareces perdido, ve al inicio:</p>
      <Button type="principal" text="Inicio" fun={() => navigate("/")}></Button>
    </div>
  );
};

export default P404;
