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
  ProductDetailsPage,
  ProfilePage,
  ShopCreatePage,
  ShopLoginPage,
  ShopDashboardPage,
  NotFoundPage,
  ShopHomePage,
  ShopCreateProduct
} from "./Routes.js";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import store from "./redux/store";
import {  loadUser,loadSeller } from "./redux/actions/userAction.js";
import { useSelector } from "react-redux";
import Scroll from './components/layouts/Scroll';
const App = () => {
  // OOOOOOOOOOOOOOOOHHHHHHHHHHHHHHHHHHHHHHHH That errorr here not dispath the action efforts Me #################
  useEffect(() => {
    store.dispatch(loadUser());
    store.dispatch(loadSeller());
  }, []);

  const { loading } = useSelector((state) => state.user);


  return (
    <>
    <div > 
      {loading ? null : (
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/sign-up" element={<SignupPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/products"  element={<ProductsPage />} />
            <Route path="/product/:name" element={<ProductDetailsPage />} />
            <Route path="/best-selling" element={<BestSellingPage />} />
            <Route path="/events" element={<EventsPage />} />
            <Route path="/faq" element={<FAQPage />} />
            <Route path="/shop-create" element={<ShopCreatePage />} />
            <Route path="/shop-login" element={<ShopLoginPage />} />
            <Route path="/dashboard" element={<ShopDashboardPage />} />
            <Route path="/dashboard-create-product" element={<ShopCreateProduct />} />
            <Route path="/shop/:id" element={<ShopHomePage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
          <ToastContainer />
        </BrowserRouter>
      )}
        <Scroll />
    </div>
      </>
  );
};

export default App;
