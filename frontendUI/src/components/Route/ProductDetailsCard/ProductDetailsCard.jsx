import React, { useEffect, useState } from "react";
import { RxCross1 } from "react-icons/rx";
import styles from "../../../styles/style";
import {
  AiFillHeart,
  AiOutlineHeart,
  AiOutlineMessage,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { addTocart } from "../../../redux/actions/cart";
import {
  addToWishlist,
  removeFromWishlist,
} from "../../../redux/actions/wishlist";

const ProductDetailsCard = ({ setOpen, data }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate(data);
  const { cart } = useSelector((state) => state.cart);
  const { wishlist } = useSelector((state) => state.wishlist);

  const [count, setCount] = useState(1); // for initial the count of the products
  const [click, setClick] = useState(false);
  // const [select, setSelect] = useState(false);

  const handleMessageSubmit = () => {};
  const incrementCount = () => {
    if (data.stock >= count) {
      setCount(count + 1);
    } else {
      toast.error("The item is out of stock");
    }
  };
  const decrementCount = () => {
    count === 0 ? setCount(count) : setCount(count - 1);
  };
  const addToCartHandler = (id) => {
    const isItemExists = cart && cart.find((i) => i.id === id);
    if (isItemExists) {
      toast.error("The item already in the cart");
    } else {
      if (count > data.stock) {
        toast.error("Product Stock Limited! Please select a Limited Product");
      } else {
        const cartData = { ...data, qty: count };
        dispatch(addTocart(cartData));
        toast.success("Item added successfully to cart");
      }
    }
  };

  // wishlist

  useEffect(() => {
    if (wishlist && wishlist.find((item) => item.id === data.id)) {
      setClick(true);
    } else {
      setClick(false);
    }
  }, [wishlist, data.id]);

  const addToWishlistHandler = (data) => {
    setClick(!click);
    dispatch(addToWishlist(data));
  };

  const removeFromWishlistHandler = (data) => {
    setClick(!click);
    dispatch(removeFromWishlist(data));
  };

  const moveToPreview = () => {
    navigate(`/shop/preview/${data.shop.id}`);
  };

  useEffect(() => {
    document.getElementById("element").focus();
  }, []);

  return (
    <div className="bg-white ">
      {data ? (
        <div
          className="fixed w-full h-screen top-0 left-0 bg-[#00000030] z-40 
        flex items-center justify-center"
        >
          <div
            className="w-[90%] 800px:w-[60%] h-[90vh] overflow-y-scroll 800px:h-[70vh]
             bg-white rounded-md shadow-sm relative p-4 outline-none"
            id="element"
            tabIndex={0}
            onBlur={() => setOpen(false)}
          >
            <RxCross1
              size={30}
              className="absolute right-3 top-3 z-50 hover:text-red-600 "
              onClick={() => setOpen(false)}
            />
            <div className="block w-full 800px:flex">
              {/* Left side */}
              <div className="w-full 800px:w-[50%] ">
                <img
                  src={
                    data.image_Url
                      ? data.image_Url[0].url
                      : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSTzdXQKtpASTHJXd8ncnw5WHJ0XCPuZ9ZSmA&usqp=CAU"
                  }
                  className="mt-7 "
                  alt=""
                />
                <div className="flex mt-4" onClick={moveToPreview}>
                  {/* <Link to={`/shop/preview/${data.shop.id}`} className="flex"> */}
                  <img
                    src={
                      data.shop.shop_avatar
                        ? data.shop.shop_avatar.url
                        : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSTzdXQKtpASTHJXd8ncnw5WHJ0XCPuZ9ZSmA&usqp=CAU"
                    }
                    alt=""
                    className="w-[50px] h-[50px] rounded-full  mr-2 "
                  />
                  <div>
                    <h3 className={`${styles.shop_name}`}>{data.shop.name}</h3>
                    <h5 className="pb-3 text-[15px] text-blue-900">
                      ({data.shop.ratings}) Ratings
                    </h5>
                  </div>
                  {/* </Link> */}
                </div>
                <div
                  className={`${styles.button} bg-[#5656ff] mt-4 rounded-[4px] h-11 hover:bg-blue-900 `}
                  onClick={handleMessageSubmit}
                >
                  <span className="text-[#fff] flex items-center">
                    Send Message <AiOutlineMessage className="ml-1" />
                  </span>
                </div>

                <h5 className="text-[16px] text-[red] mt-5">(50) Sold out</h5>
              </div>

              {/* right side */}
              <div className="w-full 800px:w-[50%] pt-5 pl-[5px] pr-[5px] ml-1">
                <h1 className={`${styles.productTitle} text-[20px]`}>
                  {data.name}
                </h1>
                <p>{data.description}</p>

                <div className="flex pt-3">
                  <h3 className={`${styles.productDiscountPrice} text-red-700`}>
                    {data.discount_price}$
                  </h3>
                  <h3 className={`${styles.price}`}>
                    {data.price ? data.price + "$" : null}
                  </h3>
                  <h2 className="ml-4 text-[blue] text-[18px] font-bold">
                    Total Price: {data.discount_price * count}$
                  </h2>
                </div>

                <div className="flex items-center mt-12 justify-between pr-3">
                  {/* button rooler */}
                  <div className="flex">
                    <div
                      className="bg-gradient-to-r from-teal-400 to-teal-500 text-white font-bold rounded-l px-4 py-2 shadow-lg hover:opacity-75 transition duration-300 ease-in-out"
                      onClick={decrementCount}
                    >
                      -
                    </div>
                    <span className="bg-gray-200 text-gray-800 font-medium px-4 py-[11px]">
                      {count}
                    </span>
                    <div
                      className="bg-gradient-to-r from-teal-400 to-teal-500 text-white font-bold rounded-l px-4 py-2 shadow-lg hover:opacity-75 transition duration-300 ease-in-out"
                      onClick={incrementCount}
                    >
                      +
                    </div>
                  </div>

                  <div>
                    {click ? (
                      <AiFillHeart
                        size={30}
                        className="cursor-pointer"
                        onClick={() => removeFromWishlistHandler(data)}
                        color={click ? "red" : "#333"}
                        title="Remove from wishlist"
                      />
                    ) : (
                      <AiOutlineHeart
                        size={30}
                        className="cursor-pointer"
                        onClick={() => addToWishlistHandler(data)}
                        title="Add to wishlist"
                      />
                    )}
                  </div>
                </div>
                <div
                  className={`${styles.button} mt-6 bg-blue-950 rounded-[4px] h-11 flex items-center ml-[30%] hover:bg-blue-700`}
                  onClick={() => addToCartHandler(data.id)}
                >
                  <span className="text-[#fff] flex items-center">
                    Add to cart <AiOutlineShoppingCart className="ml-1" />
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default ProductDetailsCard;
