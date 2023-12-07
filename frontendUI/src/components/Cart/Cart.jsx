import React, { useEffect, useState } from "react";
import { IoBagHandleOutline } from "react-icons/io5";
import { RxCross1 } from "react-icons/rx";
import styles from "../../styles/style";
import { HiOutlineMinus, HiPlus } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addTocart, removeFromCart } from "../../redux/actions/cart";
import { toast } from "react-toastify";

const Cart = ({ setOpenCart }) => {
  const { cart } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate=useNavigate()
  const totalPrice = cart.reduce(
    (acu, curr) => acu + curr.qty * curr.discount_price?curr.discount_price:curr.discountPrice,
    0
  );
  const removeFromCartHandler = (data) => {
    dispatch(removeFromCart(data));
  };

  const quantityChangeHandler = (data) => {
    dispatch(addTocart(data));
  };

const moveToCheckout=()=>{
  navigate("/checkout")
}


  useEffect(() => {
    document.getElementById("element").focus();
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full bg-[#00000048] h-screen z-10">
      <div
        className="fixed top-0 right-0 h-[100vh] overflow-y-scroll
       w-[25%] bg-white flex flex-col justify-between shadow-lg outline-none"
        tabIndex={1}
        onBlur={() => setOpenCart(false)}
        id="element"
      >
        {cart && cart.length === 0 ? (
          <div className="w-full h-screen flex items-center justify-center">
            <div className="flex w-full justify-end pt-5 pr-5 fixed top-3 right-3">
              <RxCross1
                size={25}
                className="cursor-pointer"
                onClick={() => setOpenCart(false)}
              />
            </div>
            <h5>Cart Items is empty!</h5>
          </div>
        ) : (
          <>
            <div>
              <div className="flex w-full justify-end pt-4 pr-4">
                <h1 className="flex w-full justify-center pt-4 pr-4 font-bold text-[red] text-[22px]">
                  The Cart
                </h1>
                <RxCross1
                  size={25}
                  className="cursor-pointer hover:text-[red] "
                  onClick={() => setOpenCart(false)}
                />
              </div>
              <div className={`${styles.normalFlex} p-4`}>
                <IoBagHandleOutline size={25} />
                <h5 className="pl-2 text-[20px] font-[500]">
                  {cart && cart.length} items
                </h5>
              </div>
              <br />

              {/* cart single items ######################################## */}
              <div className="w-full border-t">
                {cart &&
                  cart.map((item, index) => (
                    <CartSingle
                      key={index}
                      data={item}
                      quantityChangeHandler={quantityChangeHandler}
                      removeFromCartHandler={removeFromCartHandler}
                    />
                  ))}
              </div>
            </div>
            <div className="px-5 mb-3 ">
              {/* <Link to="/checkout"> */}
                <div
                  className={`h-[45px] flex items-center justify-center
                  cursor-pointer w-[100%] bg-[#e44343] rounded-[5px] hover:bg-[red]`}
                  onClick={moveToCheckout}
                >
                  <h1 className="text-[#fff] text-[18px] font-[600]">
                    Checkout Now (USD${totalPrice})
                  </h1>
                </div>
              {/* </Link> */}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

const CartSingle = ({ data, quantityChangeHandler, removeFromCartHandler }) => {
  const [value, setValue] = useState(data.qty);
  const totalPrice = value * data.discount_price?data.discount_price:data.discountPrice;
  const increment = (data) => {
    const updateCartData = { ...data, qty: value + 1 };
    if (value < data.stock) {
      setValue(value + 1);
      quantityChangeHandler(updateCartData);
    } else {
      toast.error("Quantity is out of range");
    }
  };
  const decrement = (data) => {
    const updateCartData = { ...data, qty: value - 1 };
    if (value > 1) {
      setValue(value - 1);
      quantityChangeHandler(updateCartData);
    }
  };

  return (
    <div className="border-b p-4">
      <div className="w-full flex item-center">
        <div>
          <div
            className={`bg-red-500 hover:bg-[red] rounded-full w-[25px] h-[25px] ${styles.normalFlex}
                    justify-center cursor-pointer `}
            onClick={() => increment(data)}
          >
            <HiPlus size={18} color="#fff" />
          </div>
          <span className="ml-2 font-bold">{value}</span>
          <div
            className="bg-[#a7abb14f] rounded-full hover:bg-gray-400 w-[25px] h-[25px] flex items-center justify-center cursor-pointer"
            onClick={() => decrement(data)}
          >
            <HiOutlineMinus size={16} color="#7d879c" />
          </div>
        </div>
        <img
          // src="https://uploads-ssl.webflow.com/621f43c49dec9b0ca2794276/624abe7649d54e4013606cda_E-commerce-Photo-Editing-Services-5.jpg"
          src={
            data && data.image_Url
              ? data.image_Url[0].url
              : "https://uploads-ssl.webflow.com/621f43c49dec9b0ca2794276/624abe7649d54e4013606cda_E-commerce-Photo-Editing-Services-5.jpg"
          }
          alt=""
          className="w-[100px] h-min ml-2 mr-2 rounded-[5px]"
        />
        <div className="pl-[5px]">
          <h1>{data.name} .</h1>
          <h4 className="font-[400] text-[15px] text-[#4b4b4b]">
            Price: {+data.discount_price?data.discount_price:data.discountPrice}$
          </h4>
          <h2 className="font-bold">
            Total: <span className="text-[red]">{totalPrice}$</span>
          </h2>
        </div>
        <RxCross1
          className="cursor-pointer hover:bg-[red] ml-3 bg-slate-200 p-2 rounded-full"
          size={40}
          onClick={() => removeFromCartHandler(data)}
        />
      </div>
    </div>
  );
};
export default Cart;
