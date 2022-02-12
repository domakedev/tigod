import React from "react";
import { render } from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import App from "./App";
import Register from "./components/pages/Register/Register.jsx";
import NotFound from "./components/pages/P404/P404.jsx";

render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/register" element={<Register />} />

      <Route path="*" element={<NotFound />} />
    </Routes>
  </BrowserRouter>,
  document.getElementById("root")
);
