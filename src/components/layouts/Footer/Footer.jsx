import React from "react";
import "./styles.css";
import { AiFillLinkedin } from "react-icons/ai";

const Footer = () => {
  return (
    <div className="footer">
      <p className="footer-tigod">2022 © TIGOD</p>
      <div className="footer-creator">
        <p>Design & Develop by César Guevara Cabrera</p>
        <a href="https://www.linkedin.com/in/domakedev/">
          <AiFillLinkedin size="25px" />
        </a>
      </div>
    </div>
  );
};

export default Footer;
