import Header from "../components/layouts/Header";
import Hero from "../components/Route/Hero/Hero.jsx";
import Categories from "../components/Route/Categories/Categories.jsx";
import BestDeals from "../components/Route/BestDeals/BestDeals.jsx";
import FeaturedProduct from "../components/Route/FeaturedProduct/FeaturedProduct.jsx";
import Events from "../components/Events/Events";
import Sponsers from "../components/Route/Sponsers.jsx"
import Footer from "../components/layouts/Footer.jsx"
import { useSelector } from "react-redux";
import Loader from "../components/Layout/Loader.jsx";


const HomePage = () => {
  const {isLoading} =useSelector(state=>state.seller)
  if(isLoading){
      return <Loader/>
  }else{
      return ( 
    <div>
      <Header activeHeading={1}/>
      <Hero/>
      <Categories/>
      <BestDeals/>
      <Events/>
      <FeaturedProduct/>
      <Sponsers/>
      <Footer/>
    </div>
  );
  }

};

export default HomePage;
