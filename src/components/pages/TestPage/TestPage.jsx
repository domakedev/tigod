import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../layouts/Buttons/Button";
import Header from "../../layouts/Header/Header";
import Footer from "../../layouts/Footer/Footer";
import TestCard from "./TestCard/TestCard";

import "./styles.css";

const TestPage = () => {
  const navigate = useNavigate();
  return (
    <div className="page-container">
      <Header />
      <div className="main-content-test">
        <TestCard>
          <Button
            text="Iniciar"
            type="principal"
            fun={() => {
              navigate("/mivocacion");
            }}
          />
        </TestCard>
      </div>
      <Footer />
    </div>
  );
};

export default TestPage;
