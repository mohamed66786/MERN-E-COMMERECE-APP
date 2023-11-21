import React from "react";
import { RxCross1 } from "react-icons/rx";

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
              onClick={()=>setOpenCart(false)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
