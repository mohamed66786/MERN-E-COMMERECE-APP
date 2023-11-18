import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LoginPage, SignupPage, HomePage } from "./Routes.js";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/sign-up" element={<SignupPage />} />
      </Routes>
      <ToastContainer />
    </BrowserRouter>
  );
};

export default App;
