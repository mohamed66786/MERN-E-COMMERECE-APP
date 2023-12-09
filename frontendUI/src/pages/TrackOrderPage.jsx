import React from 'react'
import Header from '../components/layouts/Header.jsx'
import Footer from '../components/layouts/Footer.jsx'
import TrackOrder from "../components/Profile/TrackOrder.jsx";

const TrackOrderPage = () => {
  return (
    <div>
        <Header />
        <TrackOrder />
        <Footer />
    </div>
  )
}

export default TrackOrderPage