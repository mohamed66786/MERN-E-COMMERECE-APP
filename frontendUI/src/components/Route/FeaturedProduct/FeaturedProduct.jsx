// import { useSelector } from "react-redux";
import styles from "../../../styles/style";
import ProductCard from "../ProductCard/ProductCard.jsx";
import { productData } from "../../../static/data.js";
import { useSelector } from 'react-redux';

const FeaturedProduct = () => {
  const { allProducts } = useSelector((state) => state.products);
// console.log("allProducts", allProducts);

  return (
    <div>
      <div className={`${styles.section}`}>
        <div className={`${styles.heading}`}>
          <h1>Featured Products</h1>
        </div>
        <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-4 lg:gap-[25px] xl:grid-cols-5 xl:gap-[30px] mb-12 border-0">
          {allProducts && allProducts.length !== 0 ? (
            <>
              {allProducts &&
                allProducts.map((item, index) => (
                  <ProductCard data={item} key={index} />
                ))}
            </>
          ):(
            <>
              <h1 className="text-[red] m-auto text-[20px]">No Product Exists</h1>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default FeaturedProduct;
