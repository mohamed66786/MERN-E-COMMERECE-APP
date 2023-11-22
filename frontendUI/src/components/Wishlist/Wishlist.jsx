import { IoBagHandleOutline } from "react-icons/io5";
import { RxCross1 } from "react-icons/rx";
import styles from "../../styles/style";
import { Link } from "react-router-dom";
import { BsCartPlus } from 'react-icons/bs';
const Wishlist = ({ setOpenWishlist }) => {
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
              onClick={() => setOpenWishlist(false)}
            />
          </div>
            <h1 className="flex w-full justify-center pt-4 pr-4 font-bold text-[red] text-[22px]">WishList</h1>
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
//   const totalPrice = value * data.price;
  return (
    <div className="border-b p-4">
      <div className="w-full flex item-center">
          <RxCross1 className="cursor-pointer hover:text-[red]" />
        <img
          src="https://uploads-ssl.webflow.com/621f43c49dec9b0ca2794276/624abe7649d54e4013606cda_E-commerce-Photo-Editing-Services-5.jpg"
          alt=""
          className="w-[80px] h-[70px] ml-2"
        />
        <div className="pl-[5px]">
          <h1>{data.name} .</h1>
          <span className="font-[400] text-[15px]  text-[red]">
            {+data.price}$
          </span>
      <BsCartPlus size={25} className="cursor-pointer ml-[30%] text-[blue] hover:text-black " title="Add to cart"/>
        </div>
      </div>
    </div>
  );
};
export default Wishlist;
