import React, { useEffect } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {
  LoginPage,
  SignupPage,
  HomePage,
  ProductsPage,
  BestSellingPage,
  EventsPage,
  FAQPage,
  ProductDetailsPage
} from "./Routes.js";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import store from "./redux/store";
import { loadUser } from "./redux/actions/userAction.js";
import { useSelector } from "react-redux";
const App = () => {
  // OOOOOOOOOOOOOOOOHHHHHHHHHHHHHHHHHHHHHHHH That errorr here not dispath the action efforts Me #################
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  const { loading } = useSelector((state) => state.user);

  return (
    <>
      {loading ? null : (
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/sign-up" element={<SignupPage />} />
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/product/:name" element={<ProductDetailsPage />} />
            <Route path="/best-selling" element={<BestSellingPage />} />
            <Route path="/events" element={<EventsPage />} />
            <Route path="/faq" element={<FAQPage />} />
          </Routes>
          <ToastContainer />
        </BrowserRouter>
      )}
    </>
  );
};

export default App;
