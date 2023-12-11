import { useSelector } from "react-redux";
import styles from "../../styles/style";
import ProductCard from "../Route/ProductCard/ProductCard.jsx";

const SuggestedProduct = ({ data }) => {
  const { allProducts } = useSelector((state) => state.products);

  return (
    <div>
      {data ? (
        <div className={`p-4 ${styles.section}`}>
          <h2
            className={`${styles.heading} text-[25px] font-[500] border-b mb-5`}
          >
            Related Product
          </h2>
          <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-4 lg:gap-[25px] xl:grid-cols-5 xl:gap-[30px] mb-12">
            {(allProducts &&
              allProducts.map((item, index) => (
                <ProductCard data={item} key={index} />
              ))) || (
              <h1 className="text-[20px] text-[red] m-auto">
                No Related Products
              </h1>
            )}
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default SuggestedProduct;
