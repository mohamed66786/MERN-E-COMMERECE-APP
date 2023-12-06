import { IoBagHandleOutline } from "react-icons/io5";
import { RxCross1 } from "react-icons/rx";
import styles from "../../styles/style";
import { Link } from "react-router-dom";
import { BsCartPlus } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { removeFromWishlist } from "../../redux/actions/wishlist";
import { addTocart } from "./../../redux/actions/cart";
import { toast } from "react-toastify";
import { useEffect } from "react";
const Wishlist = ({ setOpenWishlist }) => {
  const dispatch = useDispatch();
  const { wishlist } = useSelector((stata) => stata.wishlist);
  const totalPrice =
    wishlist && wishlist.reduce((acu, curr) => acu + curr.discount_price, 0);

  const removeFromWishlistHandler = (data) => {
    dispatch(removeFromWishlist(data));
  };

  const addTocartHandler = (data) => {
    const newData = { ...data, qty: 1 };
    dispatch(addTocart(newData));
    toast.success("Item added successfully");
    setOpenWishlist(false);
  };
  useEffect(() => {
    document.getElementById("element").focus();
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full bg-[#00000048] h-screen z-10">
      <div
        className="fixed top-0 right-0 h-[100vh] w-[25%] bg-white flex flex-col
      overflow-y-scroll  justify-between shadow-lg outline-none"
        id="element"
        tabIndex="0"
        onBlur={() => setOpenWishlist(false)}
      >
        {wishlist && wishlist.length === 0 ? (
          <div className="w-full h-screen flex items-center justify-center">
            <div className="flex w-full justify-end pt-5 pr-5 fixed top-3 right-3">
              <RxCross1
                size={25}
                className="cursor-pointer"
                onClick={() => setOpenWishlist(false)}
              />
            </div>
            <h5>Wishlist Items is empty!</h5>
          </div>
        ) : (
          <>
            <div>
              <div className="flex w-full justify-end pt-4 pr-4">
                <h1 className="flex w-full justify-center pt-4 pr-4 font-bold text-[red] text-[22px]">
                  WishList
                </h1>
                <RxCross1
                  size={25}
                  className="cursor-pointer hover:text-[red] "
                  onClick={() => setOpenWishlist(false)}
                />
              </div>
              <div className={`${styles.normalFlex} p-4`}>
                <IoBagHandleOutline size={25} />
                <h5 className="pl-2 text-[20px] font-[500]">
                  {wishlist && wishlist.length}{" "}
                  {wishlist && wishlist.length <= 1 ? "item" : "items"}
                </h5>
              </div>
              <br />

              {/* cart single items */}
              <div className="w-full border-t">
                {wishlist &&
                  wishlist.map((item, index) => (
                    <CartSingle
                      key={index}
                      data={item}
                      removeFromWishlistHandler={removeFromWishlistHandler}
                      addTocartHandler={addTocartHandler}
                    />
                  ))}
              </div>
            </div>
            <div className="px-5 mb-3 ">
              <Link to="/checkout">
                <div
                  className={`h-[45px] flex items-center justify-center w-[100%] bg-[#e44343] rounded-[5px] hover:bg-[red]`}
                >
                  <h1 className="text-[#fff] text-[18px] font-[600]">
                    Checkout Now (USD${totalPrice})
                  </h1>
                </div>
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

const CartSingle = ({ data, removeFromWishlistHandler, addTocartHandler }) => {
  //   const totalPrice = value * data.price;
  return (
    <div className="border-b p-4">
      <div className="w-full flex item-center">
        <RxCross1
          className="cursor-pointer hover:text-[red] mr-2 "
          size={30}
          onClick={() => removeFromWishlistHandler(data)}
        />
        <img
          src={
            data.image_Url
              ? data.image_Url[0].url
              : "https://uploads-ssl.webflow.com/621f43c49dec9b0ca2794276/624abe7649d54e4013606cda_E-commerce-Photo-Editing-Services-5.jpg"
          }
          alt=""
          className="w-[90px] mt-2 h-[70px] ml-2 mr-2"
        />
        <div className="pl-[5px]">
          <h1>{data.name} .</h1>
          <span className="font-[400] text-[15px]  text-[red]">
            Price: {data.discount_price}$
          </span>
          <BsCartPlus
            size={25}
            className="cursor-pointer  text-[blue] hover:text-black "
            title="Add to cart"
            onClick={() => addTocartHandler(data)}
          />
        </div>
      </div>
    </div>
  );
};
export default Wishlist;
