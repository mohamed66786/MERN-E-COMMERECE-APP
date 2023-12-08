import React, { useEffect, useState } from "react";
import Header from "./../components/layouts/Header";
import styles from "../styles/style";
import { useSearchParams } from "react-router-dom";
import { productData } from "../static/data";
import ProductCard from "../components/Route/ProductCard/ProductCard";
import Footer from './../components/layouts/Footer';

const ProductsPage = () => {
  const [searchParmas] = useSearchParams();
  const categoryData = searchParmas.get("category");
  const [data, setData] = useState([]);
  useEffect(() => {
    if (categoryData == null) {
      const d =
        productData && productData.sort((a, b) => a.total_sell - b.total_sell);
      setData(d);
    } else {
      const d =
        productData &&
        productData.filter((item) => item.category === categoryData);
      setData(d);
    }
  }, [categoryData]);

  return (
    <div>
      <Header activeHeading={3} />
      <br />
      <br />
      <div className={`${styles.section}`}>
        <div
          className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px]
         lg:grid-cols-4 lg:gap-[25px] xl:grid-cols-5 xl:gap-[30px] mb-12"
        >
          {data &&
            data.map((item, index) => <ProductCard data={item} key={index}/>)}
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

export default ProductsPage;
