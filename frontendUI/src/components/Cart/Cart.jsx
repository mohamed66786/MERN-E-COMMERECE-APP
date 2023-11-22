import React, { useState } from "react";
import { IoBagHandleOutline } from "react-icons/io5";
import { RxCross1 } from "react-icons/rx";
import styles from "../../styles/style";
import { HiOutlineMinus, HiPlus } from "react-icons/hi";
import { Link } from "react-router-dom";
const Cart = ({ setOpenCart }) => {
  const cartData = [
    {
      name: "Iphone 14 pro max 256 gb  and ssd",
      decription: "this is the new phone version",
      price: 999,
    },
    {
      name: "Iphone 14 pro max 256 gb  and ssd",
      decription: "this is the new phone version",
      price: 999,
    },
    {
      name: "Iphone 14 pro max 256 gb  and ssd",
      decription: "this is the new phone version",
      price: 999,
    },
  ];
  return (
    <div className="fixed top-0 left-0 w-full bg-[#00000048] h-screen z-10">
      <div className="fixed top-0 right-0 min-h-full w-[25%] bg-white flex flex-col justify-between shadow-lg">
        <div>
          <div className="flex w-full justify-end pt-4 pr-4">
            <RxCross1
              size={25}
              className="cursor-pointer hover:text-[red] "
              onClick={() => setOpenCart(false)}
            />
          </div>
          <h1 className="flex w-full justify-center pt-4 pr-4 font-bold text-[red] text-[22px]">The Cart</h1>
          <div className={`${styles.normalFlex} p-4`}>
            <IoBagHandleOutline size={25} />
            <h5 className="pl-2 text-[20px] font-[500]">
              {/* {cart && cart.length} items */}3 items
            </h5>
          </div>
          <br />
          {/* cart single items */}
          <div className="w-full border-t">
            {cartData &&
              cartData.map((item, index) => (
                <CartSingle key={index} data={item} />
              ))}
          </div>
        </div>
        <div className="px-5 mb-3 ">
          <Link to="/checkout">
            <div
              className={`h-[45px] flex items-center justify-center w-[100%] bg-[#e44343] rounded-[5px] hover:bg-[red]`}
            >
              <h1 className="text-[#fff] text-[18px] font-[600]">
                Checkout Now (USD$1090)
              </h1>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

const CartSingle = ({ data }) => {
  const [value, setValue] = useState(1);
  // const totalPrice = value * data.price;
  return (
    <div className="border-b p-4">
      <div className="w-full flex item-center">
        <div>
          <div
            className={`bg-red-500 hover:bg-[red] rounded-full w-[25px] h-[25px] ${styles.normalFlex}
                    justify-center cursor-pointer `}
            onClick={() => setValue(value + 1)}
          >
            <HiPlus size={18} color="#fff" />
          </div>
          <span className="ml-2 font-bold">{value}</span>
          <div
            className="bg-[#a7abb14f] rounded-full hover:bg-gray-400 w-[25px] h-[25px] flex items-center justify-center cursor-pointer"
            onClick={() => setValue(value === 1 ? 1 : value - 1)}
          >
            <HiOutlineMinus size={16} color="#7d879c" />
          </div>
        </div>
        <img
          src="https://uploads-ssl.webflow.com/621f43c49dec9b0ca2794276/624abe7649d54e4013606cda_E-commerce-Photo-Editing-Services-5.jpg"
          alt=""
          className="w-[80px] h-[70px] ml-2"
        />
        <div className="pl-[5px]">
          <h1>{data.name} .</h1>
          <h4 className="font-[400] text-[15px] text-[#4b4b4b]">
            {+data.price}*{+value}$
          </h4>
          <h2 className="font-bold">
            Total: <span className="text-[red]">{value * data.price}$</span>
          </h2>
        </div>
        <RxCross1 className="cursor-pointer hover:text-[red]" />
      </div>
    </div>
  );
};
export default Cart;