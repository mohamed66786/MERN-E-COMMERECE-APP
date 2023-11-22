import React, { useEffect, useState } from "react";
import Header from "./../components/layouts/Header";
import styles from "../styles/style";
// import { useSearchParams } from "react-router-dom";
import { productData } from "../static/data";
import ProductCard from "../components/Route/ProductCard/ProductCard";
import Footer from './../components/layouts/Footer';

const BestSellingPage = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    const d=productData&&productData.sort((a,b)=>b.total_sell-a.total_sell);
    setData(d);
  }, []);

  return (
    <div>
      <Header activeHeading={2} />
      <br />
      <br />
      <div className={`${styles.section}`}>
        <div
          className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px]
         lg:grid-cols-4 lg:gap-[25px] xl:grid-cols-5 xl:gap-[30px] mb-12"
        >
          {data &&
            data.map((item, index) => <ProductCard data={item} key={index} />)}
        </div>
        {data && data.length === 0 ? (
          <h1 className="text-center w-full pb-[100px] text-[20px]">
            No products Found!
          </h1>
        ) : null}
      </div>
      <Footer/>
    </div>
  );
};

export default BestSellingPage;