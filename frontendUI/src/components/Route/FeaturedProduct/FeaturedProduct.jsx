// import { useSelector } from "react-redux";
import styles from "../../../styles/style";
import ProductCard from "../ProductCard/ProductCard.jsx";
import { productData } from "../../../static/data.js";

const FeaturedProduct = () => {
//   const { allProducts } = useSelector((state) => state.products);

  return (
    <div>
      <div className={`${styles.section}`}>
        <div className={`${styles.heading}`}>
          <h1>Featured Products</h1>
        </div>
        <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-4 lg:gap-[25px] xl:grid-cols-5 xl:gap-[30px] mb-12 border-0">
          {productData && productData.length !== 0 && (
            <>
              {productData &&
                productData.map((item, index) => (
                  <ProductCard data={item} key={index} />
                ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default FeaturedProduct;