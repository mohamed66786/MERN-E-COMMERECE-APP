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
  ShopCreateProduct,
  ShopAllProducts,
  ShopCreateEvents,
  ShopAllEvents,
  ShopAllCoupouns,
  ShopPreviewPage,
  CheckoutPage,
  PaymentPage,
  OrderSuccessPage,
  ShopAllOrders,
  ShopOrderDetails,
  OrderDetailsPage,
} from "./Routes.js";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import store from "./redux/store";
import { loadUser, loadSeller } from "./redux/actions/userAction.js";
import { useSelector } from "react-redux";
import Scroll from "./components/layouts/Scroll";
import SellerProtectedRoute from "./routes/shopRoutes/SellerProtectedRoute ";
import { getAllProducts } from "./redux/actions/product.js";
import { getAllEvents } from "./redux/actions/event.js";
import ProtectedRoute from "./routes/userRoutes/ProtectedRoute ";
const App = () => {
  // OOOOOOOOOOOOOOOOHHHHHHHHHHHHHHHHHHHHHHHH That errorr here not dispath the action efforts Me #################
  useEffect(() => {
    store.dispatch(loadUser());
    store.dispatch(loadSeller());
    store.dispatch(getAllProducts());
    store.dispatch(getAllEvents());
  }, []);

  const { loading } = useSelector((state) => state.user);

  return (
    <>
      <div>
        {loading ? null : (
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/sign-up" element={<SignupPage />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/products" element={<ProductsPage />} />
              <Route path="/product/:name" element={<ProductDetailsPage />} />
              <Route path="/best-selling" element={<BestSellingPage />} />
              <Route path="/events" element={<EventsPage />} />
              <Route path="/faq" element={<FAQPage />} />
              <Route path="/shop-create" element={<ShopCreatePage />} />
              <Route path="/shop-login" element={<ShopLoginPage />} />
              <Route path="/dashboard" element={<ShopDashboardPage />} />
              <Route
                path="/dashboard-create-product"
                element={<ShopCreateProduct />}
              />
              <Route
                path="/dashboard-products"
                element={
                  <SellerProtectedRoute>
                    <ShopAllProducts />
                  </SellerProtectedRoute>
                }
              />
              <Route
                path="/dashboard-orders"
                element={
                  <SellerProtectedRoute>
                    <ShopAllOrders />
                  </SellerProtectedRoute>
                }
              />
              <Route
                path="/order/:id"
                element={
                  <SellerProtectedRoute>
                    <ShopOrderDetails />
                  </SellerProtectedRoute>
                }
              />
              <Route
                path="/dashboard-create-event"
                element={
                  <SellerProtectedRoute>
                    <ShopCreateEvents />
                  </SellerProtectedRoute>
                }
              />
              <Route
                path="/dashboard-events"
                element={
                  <SellerProtectedRoute>
                    <ShopAllEvents />
                  </SellerProtectedRoute>
                }
              />
              <Route
                path="/dashboard-coupouns"
                element={
                  <SellerProtectedRoute>
                    <ShopAllCoupouns />
                  </SellerProtectedRoute>
                }
              />

              <Route
                path="/checkout"
                element={
                  <ProtectedRoute>
                    <CheckoutPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/payment"
                element={
                  <ProtectedRoute>
                    <PaymentPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/user/order/:id"
                element={
                  <ProtectedRoute>
                    <OrderDetailsPage />
                  </ProtectedRoute>
                }
              />
              <Route path="/shop/:id" element={<ShopHomePage />} />
              <Route path="/order/success" element={<OrderSuccessPage />} />
              <Route path="/shop/preview/:id" element={<ShopPreviewPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
            <ToastContainer
              position="bottom-center"
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="dark"
            />
          </BrowserRouter>
        )}
        <Scroll />
      </div>
    </>
  );
};

export default App;
