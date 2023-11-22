import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../../styles/style";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";

const ProductDetails = ({ data }) => {
  const [count, setCount] = useState(1);
  const [click, setClick] = useState(false);
  const [select, setSelect] = useState(0);

  const navigat = useNavigate();

  const incrementCount = () => {
    setCount(count + 1);
  };
  const decrementCount = () => {
    count >= 1 ? setCount(count - 1) : setCount(count);
  };

  return (
    <div className="bg-white">
      {data ? (
        <div className={`${styles.section} w-[90%] 800px:w-[80%]`}>
          <div className="w-full py-5">
            <div className="block w-full 800px:flex">
              {/* left part */}
              <div className="w-full 800px:w-[50%]">
                <img
                  src={data.image_Url[select].url}
                  alt=""
                  className="w-[80%] "
                />
                <div className="w-full flex ">
                  <div
                    className={`${
                      select === 0 ? "border border-gray-500" : "null"
                    } cursor-pointer mr-5 mt-4`}
                  >
                    <img
                      src={data?.image_Url[0].url}
                      alt=""
                      className="h-[200px]"
                      onClick={() => setSelect(0)}
                    />
                  </div>
                  <div
                    className={`${
                      select === 1 ? "border border-gray-500" : "null"
                    } cursor-pointer mr-5 mt-4`}
                  >
                    <img
                      src={data?.image_Url[1].url}
                      alt=""
                      className="h-[200px]"
                      onClick={() => setSelect(1)}
                    />
                  </div>
                </div>
              </div>
              {/* right part */}
              <div className="w-full 800px:w-[50%] pt-5">
                <h1 className={`${styles.productTitle}`}>{data.name}</h1>
                <p>{data.description}</p>
                <div className="flex pt-3">
                  <h4 className={`${styles.productDiscountPrice} text-[blue]`}>
                    {data.discount_price}$
                  </h4>
                  <h3 className={`${styles.price} text-[red]`}>
                    {data.price ? data.price + "$" : null}
                  </h3>
                </div>
                {/* #################################################################### */}
                <div className="flex items-center mt-12 justify-between pr-3">
                  {/* button rooler */}
                  <div>
                    <button
                      className="bg-gradient-to-r from-teal-400 to-teal-500 text-white font-bold rounded-l px-4 py-2 shadow-lg hover:opacity-75 transition duration-300 ease-in-out"
                      onClick={decrementCount}
                    >
                      -
                    </button>
                    <span className="bg-gray-200 text-gray-800 font-medium px-4 py-[11px]">
                      {count}
                    </span>
                    <button
                      className="bg-gradient-to-r from-teal-400 to-teal-500 text-white font-bold rounded-l px-4 py-2 shadow-lg hover:opacity-75 transition duration-300 ease-in-out"
                      onClick={incrementCount}
                    >
                      +
                    </button>
                  </div>

                  <div>
                    {click ? (
                      <AiFillHeart
                        size={30}
                        className="cursor-pointer"
                        onClick={() => setClick(!click)}
                        color={click ? "red" : "#333"}
                        title="Remove from wishlist"
                      />
                    ) : (
                      <AiOutlineHeart
                        size={30}
                        className="cursor-pointer"
                        onClick={() => setClick(!click)}
                        title="Add to wishlist"
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="w-screen h-[200px] bg-white flex ">
          <h1 className="font-bold text-[30px] text-[red]  m-auto">
            Nothing Found four This product
          </h1>
        </div>
      )}
    </div>
  );
};

export default ProductDetails;