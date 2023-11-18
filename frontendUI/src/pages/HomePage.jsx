import Header from "../components/layouts/Header";
import Hero from "../components/Route/Hero/Hero.jsx";
import Categories from "../components/Route/Categories/Categories.jsx";

const HomePage = () => {
  return (
    <div>
      <Header activeHeading={1}/>
      <Hero/>
      <Categories/>
    </div>
  );
};

export default HomePage;
