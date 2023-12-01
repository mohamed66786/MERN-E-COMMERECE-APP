import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  AiFillHeart,
  AiFillStar,
  AiOutlineEye,
  AiOutlineHeart,
  AiOutlineShoppingCart,
  AiOutlineStar,
} from "react-icons/ai";
import styles from "../../../styles/style";
import ProductDetailsCard from "../ProductDetailsCard/ProductDetailsCard.jsx";

const ProductCard = ({ data }) => {
  const [click, setClick] = useState(false);
  const [open, setOpen] = useState(false);

  const d = data.name;
  const productName = d.replace(/\s+/g, "-");
  return (
    <>
      <div className="w-full cursor-pointer h-[370px] bg-white rounded-lg shadow-sm p-3 relative ">
        <div className="flex justify-end"></div>
        <Link to={`/product/${productName}`}>
          <img
            src={
              data.image_Url
                ? data.image_Url[0].url
                : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSTzdXQKtpASTHJXd8ncnw5WHJ0XCPuZ9ZSmA&usqp=CAU"
            }
            alt="Content Img"
            className="w-10/12  h-[170px] object-contain "
          />
        </Link>
        <Link to={`/product/${productName}`}>
          <h5 className="text-blue-500">{data.shop.name}</h5>
        </Link>
        <Link to={`/product/${productName}`}>
          <h4 className="pb-3 font-[500]">
            {data.name.length > 40
              ? data.name.split(" ").slice(0, 14).join(" ") + "  ...."
              : data.name}
          </h4>
          <div className="flex">
            <AiFillStar
              className="mr-2 cursor-pointer text-yellow-400"
              size={20}
            />
            <AiFillStar
              className="mr-2 cursor-pointer text-yellow-400"
              size={20}
            />
            <AiFillStar
              className="mr-2 cursor-pointer text-yellow-400"
              size={20}
            />
            <AiFillStar
              className="mr-2 cursor-pointer text-yellow-400"
              size={20}
            />
            <AiOutlineStar
              className="mr-2 cursor-pointer text-yellow-400"
              size={20}
            />
          </div>

          <div className="flex py-2 items-center justify-between">
            <div className="flex">
              <h6 className={`${styles.productDiscountPrice} text-red-800 `}>
                {data.price === 0 ? data.price : data.discount_price}$
              </h6>
              <h4 className={`${styles.price}`}>
                {data.price ? data.price + "$" : null}
              </h4>
            </div>
            <span className="font-[400] text-[17px] text-[#68d284]">
              {data?.total_sell} sold
            </span>
          </div>
        </Link>
        {/* side options */}
        <div>
          {click ? (
            <AiFillHeart
              size={22}
              className="cursor-pointer absolute right-2 top-5 "
              onClick={() => setClick(!click)}
              color={click ? "red" : "#333"}
              title="Remove from wishlist"
            />
          ) : (
            <AiOutlineHeart
              size={22}
              className="cursor-pointer absolute right-2 top-5 "
              onClick={() => setClick(!click)}
              color={click ? "red" : "#333"}
              title="Add to wishlist"
            />
          )}
          <AiOutlineEye
            size={22}
            className="cursor-pointer absolute right-2 top-14 "
            onClick={() => setOpen(!open)}
            color="#333"
            title="Quick view"
          />
          <AiOutlineShoppingCart
            size={25}
            className="cursor-pointer absolute right-2 top-24 "
            // onClick={() => addToCartHandler(data._id)}
            color="#444"
            title="Add to cart"
          />
          {open ? <ProductDetailsCard setOpen={setOpen} data={data} /> : null}
        </div>
      </div>
    </>
  );
};

export default ProductCard;
