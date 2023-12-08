import React from 'react'
import Header from '../components/layouts/Header.jsx'
import Footer from '../components/layouts/Footer.jsx'
import UserOrderDetails from "../components/UserOrderDetails.jsx";

const OrderDetailsPage = () => {
  return (
    <div>
        <Header />
        <UserOrderDetails />
        <Footer />
    </div>
  )
}

export default OrderDetailsPage