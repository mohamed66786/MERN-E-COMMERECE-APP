import React, { useEffect, useState } from "react";
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
import { useDispatch, useSelector } from "react-redux";
import {
  addToWishlist,
  removeFromWishlist,
} from "../../../redux/actions/wishlist";
import { toast } from "react-toastify";
import { addTocart } from "../../../redux/actions/cart.js";

const ProductCard = ({ data }) => {
  const { cart } = useSelector((state) => state.cart);
  const { wishlist } = useSelector((state) => state.wishlist);
  // const [countStarsHere, setCountStarsHere] = useState(countStars);

  const [click, setClick] = useState(false);
  const [open, setOpen] = useState(false);
  const [rating, setRating] = useState(1);

  console.log(cart);
  const dispatch = useDispatch();
  const d = data.name;
  const productName = d.replace(/\s+/g, "-");

  useEffect(() => {
    if (
      wishlist &&
      wishlist.find((item) =>
        item.id ? item.id === data.id : item._id === data._id
      )
    ) {
      setClick(true);
    } else {
      setClick(false);
    }
  }, [wishlist, data.id, data._id]);

  const addToWishlistHandler = (data) => {
    setClick(!click);
    dispatch(addToWishlist(data));
  };

  const removeFromWishlistHandler = (data) => {
    setClick(!click);
    dispatch(removeFromWishlist(data));
  };

  const addToCartHandler = (data) => {
    const isItemExists =
      cart &&
      cart.find((item) =>
        item.id ? item.id === data.id : item._id === data._id
      );
    if (isItemExists) {
      toast.error("The item already in the cart");
    } else {
      if (data.stock < 1) {
        toast.error("Product Stock Limited! Please select a Limited Product");
      } else {
        const cartData = { ...data, qty: 1 };
        dispatch(addTocart(cartData));
        toast.success("Item added successfully to cart");
      }
    }
  };

  return (
    <>
      <div
        className="w-full cursor-pointer h-[370px] bg-white rounded-lg
       shadow-sm p-3 relative hover:shadow-2xl  "
      >
        <div className="flex justify-end"></div>
        <Link to={`/product/${productName}`}>
          <img
            src={
              data.image_Url
                ? data.image_Url[0].url
                : data.imageURL
                ? data.imageURL
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
              ? data.name.split(" ").slice(0, 10).join(" ") + "  ...."
              : data.name}
          </h4>
        </Link>
        {/* start of rating ############################################## */}

        <div className="flex w-full ml-2 pt-1">
          {[1, 2, 3, 4, 5].map((i) =>
            rating >= i ? (
              <AiFillStar
                key={i}
                className="mr-1 cursor-pointer"
                color="rgb(246,186,0)"
                size={25}
                onClick={() => setRating(i)}
              />
            ) : (
              <AiOutlineStar
                key={i}
                className="mr-1 cursor-pointer"
                color="rgb(246,186,0)"
                size={25}
                onClick={() => setRating(i)}
              />
            )
          )}
        </div>

        {/* {countStarsHere === 0 ? (
            <div className="flex">
              <AiOutlineStar
                className="mr-2 cursor-pointer text-yellow-400"
                size={20}
              />
              <AiOutlineStar
                className="mr-2 cursor-pointer text-yellow-400"
                size={20}
              />
              <AiOutlineStar
                className="mr-2 cursor-pointer text-yellow-400"
                size={20}
              />
              <AiOutlineStar
                className="mr-2 cursor-pointer text-yellow-400"
                size={20}
              />
              <AiOutlineStar
                className="mr-2 cursor-pointer text-yellow-400"
                size={20}
              />
            </div>
          ) : countStarsHere === 1 ? (
            <div className="flex">
              <AiFillStar
                className="mr-2 cursor-pointer text-yellow-400"
                size={20}
              />
              <AiOutlineStar
                className="mr-2 cursor-pointer text-yellow-400"
                size={20}
              />
              <AiOutlineStar
                className="mr-2 cursor-pointer text-yellow-400"
                size={20}
              />
              <AiOutlineStar
                className="mr-2 cursor-pointer text-yellow-400"
                size={20}
              />
              <AiOutlineStar
                className="mr-2 cursor-pointer text-yellow-400"
                size={20}
              />
            </div>
          ) : countStarsHere === 2 ? (
            <div className="flex">
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
              <AiOutlineStar
                className="mr-2 cursor-pointer text-yellow-400"
                size={20}
              />
              <AiOutlineStar
                className="mr-2 cursor-pointer text-yellow-400"
                size={20}
              />
            </div>
          ) : countStarsHere === 3 ? (
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
              <AiOutlineStar
                className="mr-2 cursor-pointer text-yellow-400"
                size={20}
              />
              <AiOutlineStar
                className="mr-2 cursor-pointer text-yellow-400"
                size={20}
              />
            </div>
          ) : countStarsHere === 4 ? (
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
          ) : countStarsHere === 5 ? (
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
              <AiFillStar
                className="mr-2 cursor-pointer text-yellow-400"
                size={20}
              />
            </div>
          ) : null} */}

        {/* rating counter */}
        {/* <div className="flex">
          <h1 className="text-[red] mt-2 text-[20px] mr-7">Rate: </h1>
          <div
            className="bg-gradient-to-r from-teal-400 to-teal-500 text-white font-bold rounded-l px-4 py-2 shadow-lg hover:opacity-75 transition duration-300 ease-in-out"
            onClick={() =>
              setCountStarsHere(
                countStarsHere > 0 ? countStarsHere - 1 : countStarsHere
              )
            }
          >
            -
          </div>
          <span className="bg-gray-200 text-gray-800 font-medium px-4 py-[11px]">
            {countStarsHere}
          </span>
          <div
            className="bg-gradient-to-r from-teal-400 to-teal-500 text-white font-bold rounded-l px-4 py-2 shadow-lg hover:opacity-75 transition duration-300 ease-in-out"
            onClick={() =>
              setCountStarsHere(
                countStarsHere < 5 ? countStarsHere + 1 : countStarsHere
              )
            }
          >
            +
          </div>
        </div> */}

        <div className="flex py-2 items-center justify-between">
          <div className="flex">
            <h6 className={`${styles.productDiscountPrice} text-red-800 `}>
              {data.price === 0
                ? data.price
                : data.discount_price
                ? data.discount_price
                : data.discountPrice}
              $
            </h6>
            <h4 className={`${styles.price}`}>
              {data.price
                ? data.price + "$"
                : data.originalPrice
                ? data.originalPrice + "$"
                : null}
            </h4>
          </div>
          <span className="font-[400] text-[17px] text-[#68d284]">
            {data?.total_sell || 10} sold
          </span>
        </div>

        {/* side options */}
        <div>
          {click ? (
            <AiFillHeart
              size={22}
              className="cursor-pointer absolute right-2 top-5 "
              onClick={() => removeFromWishlistHandler(data)}
              color={click ? "red" : "#333"}
              title="Remove from wishlist"
            />
          ) : (
            <AiOutlineHeart
              size={22}
              className="cursor-pointer absolute right-2 top-5 "
              onClick={() => addToWishlistHandler(data)}
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
            onClick={() => addToCartHandler(data)}
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
