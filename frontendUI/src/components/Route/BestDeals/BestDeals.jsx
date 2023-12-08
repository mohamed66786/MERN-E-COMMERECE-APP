import React, { useEffect, useState } from "react";
import { productData } from "../../../static/data";
import styles from "../../../styles/style";
import ProductCard from "../ProductCard/ProductCard.jsx"

const BestDeals = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const d =
      productData && productData.sort((a, b) => b.total_sell - a.total_sell);
    const bestFive = d.slice(0, 5);
    setData(bestFive);
  }, []);
  return (
    <div className="mb-10">
      <div className={styles.section}>
        <div className={styles.heading}>
          <h1>Best Deals</h1>
        </div>
        <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-4 lg:gap-[25px] 
        xl:grid-cols-5 xl:gap-[30px] mb-12 border-0">
            {data&&data.map((item,index)=>{
                return (
                    <ProductCard data={item} key={index} countStars={1}/>
                )
            })}
        </div>
      </div>
    </div>
  );
};

export default BestDeals;
