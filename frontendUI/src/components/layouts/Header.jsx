import React, { useState } from "react";
import styles from "./../../styles/style";
import { Link, useNavigate } from "react-router-dom";
import { productData, categoriesData } from "../../static/data";
import {
  AiOutlineHeart,
  AiOutlineSearch,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { IoIosArrowForward, IoIosArrowDown } from "react-icons/io";
import { BiMenuAltLeft } from "react-icons/bi";
import DropDown from "./DropDown.jsx";
import Navbar from "./Navbar.jsx";
import { CgProfile } from "react-icons/cg";
import { useSelector } from "react-redux";
import { IoLogOut } from "react-icons/io5";
import axios from "axios";
import { server } from "../../backendServer.js";
import { toast } from "react-toastify";
import { FaDoorOpen } from "react-icons/fa6";
import Cart from "../Cart/Cart.jsx";
import Wishlist from "../Wishlist/Wishlist.jsx";

const Header = ({ activeHeading }) => {
  const { isAuthenticated } = useSelector((state) => state.user);
  const [searchValue, setSearchValue] = useState("");
  const [searchData, setSearchData] = useState(null);
  const [active, setActive] = useState(false);
  const [dropDown, setDropDown] = useState(false);
  const [focus, setFocus] = useState(true);
  const [openCart, setOpenCart] = useState(false);
  const [openWishlist, setOpenWishlist] = useState(false);

  const navigate = useNavigate();
  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchValue(value);
    const filteredProducts =
      productData &&
      productData.filter((product) => {
        return product.name.toLowerCase().includes(value.toLowerCase());
      });
    setSearchData(filteredProducts);
  };

  const logoutHandler = () => {
    axios
      .get(`${server}/user/logout`, { withCredentials: true })
      .then(() => {
        toast.success(`User logged out successfully`);
        navigate("/");
        setTimeout(() => {
          window.location.reload();
        }, 4000);
      })
      .catch(() => {
        toast.error(`User logout failed`);
      });
  };

  window.addEventListener("scroll", () => {
    if (window.scrollY > 70) {
      setActive(true);
    } else {
      setActive(false);
    }
  });

  return (
    <>
      {/* first part */}
      <div className={`${styles.section} py-1 mt-1 `}>
        <div className="hidden 800px:h-[50px] 800px:my-[20px] 800px:flex items-center justify-between">
          <div>
            <Link to="/">
              <img
                src="https://shopo.quomodothemes.website/assets/images/logo.svg"
                alt="Logo"
              />
            </Link>
          </div>

          {/* Search box */}
          <div className="w-[50%] relative">
            <input
              type="text"
              placeholder="Search for product..."
              value={searchValue}
              onChange={handleSearchChange}
              className="h-[40px] w-full px-2 border-gray-400 border-[2px] rounded-md"
              onBlur={() => {
                setFocus(false);
                setSearchValue("");
              }}
              onFocus={() => setFocus(true)}
            />
            <AiOutlineSearch
              size={30}
              className="absolute right-2 top-1.5 cursor-pointer"
            />

            {/* after write what searchin for */}
            {searchData && searchData.length !== 0 && searchValue && focus ? (
              <div className="absolute min-h-[30vh]  shadow-sm-2 z-[9] p-4 bg-blue-300">
                {searchData &&
                  searchData.map((item, index) => {
                    return (
                      <Link
                        to={`/product/${item._id}`}
                        className="bg-gray-400 "
                      >
                        <div className="w-full flex items-start-py-3 hover:bg-blue-500">
                          <img
                            src={`${item.image_Url[0]?.url}`}
                            alt=""
                            className="w-[40px] h-[40px] mr-[10px]"
                          />
                          <h1>{item.name}</h1>
                        </div>
                      </Link>
                    );
                  })}
              </div>
            ) : null}
          </div>
          {/* button */}
          <div className={`${styles.button}`}>
            <Link to="/seller">
              <h1 className="text-[#fff] flex items-center">
                Become Seller
                <IoIosArrowForward className="ml-1" />
              </h1>
            </Link>
          </div>
        </div>
      </div>
      {/* second part */}
      <div
        className={`${
          active === true ? "shadow-sm fixed top-0 left-0 z-10" : null
        } transition hidden 800px:flex items-center justify-between w-full bg-[#1877F2] h-[70px] `}
      >
        <div
          className={`${styles.section} relative ${styles.normalFlex} justify-between`}
        >
          {/* categories */}
          <div
            onClick={() => setDropDown(!dropDown)}
            className="relative h-[60px] mt-[10px]  w-[270px] hidden 1000px:block"
          >
            <BiMenuAltLeft
              size={30}
              className="absolute top-3 left-2 cursor-pointer"
            />

            <button
              className={`h-[100%] w-full flex justify-between items-center pl-10 bg-white 
              font-sans text-lg font-[500] select-none rounded-t-md`}
            >
              All Categories
            </button>

            <IoIosArrowDown
              size={20}
              className="absolute right-2 top-4 cursor-pointer "
            />
            {dropDown ? (
              <DropDown
                categoriesData={categoriesData}
                setDropDown={setDropDown}
              />
            ) : null}
          </div>

          {/* nav items */}
          <div className={`${styles.normalFlex}`}>
            <Navbar active={activeHeading} />
          </div>

          <div className="flex">
            {/* Heart */}
            <div className={`${styles.normalFlex}`} title="wishList">
              <div
                className="relative cursor-pointer mr-[15px]"
                onClick={() => setOpenWishlist(true)}
              >
                <AiOutlineHeart size={30} color="rgb(255 255 255 / 83%)" />
                <span
                  className="absolute right-0 top-0 rounded-full bg-[#ff3d3d]
               w-4 h-4 top right p-0 m-0 text-white font-mono text-[12px] leading-tight text-center"
                >
                  {/* {wishlist && wishlist.length} */}3
                </span>
              </div>
            </div>

            {/* shoping cart */}

            <div className={`${styles.normalFlex}`} title="shoping cart">
              <div
                className="relative cursor-pointer mr-[15px]"
                onClick={() => setOpenCart(true)}
              >
                <AiOutlineShoppingCart
                  size={30}
                  color="rgb(255 255 255 / 83%)"
                />
                <span className="absolute right-0 top-0 rounded-full bg-[#ff3d3d] w-4 h-4 top right p-0 m-0 text-white font-mono text-[12px] leading-tight text-center">
                  {/* {cart && cart.length} */}2
                </span>
              </div>
            </div>

            {/* profile */}
            <div className={`${styles.normalFlex}`} title="profile">
              <div className="relative cursor-pointer mr-[15px]">
                {isAuthenticated ? (
                  <Link to="/profile">
                    <img
                    // this image should be dynamically loaded from backend
                      src="https://t4.ftcdn.net/jpg/03/64/21/11/360_F_364211147_1qgLVxv1Tcq0Ohz3FawUfrtONzz8nq3e.jpg"
                      alt=""
                      className="w-[35px] h-[35px] rounded-full "
                    />
                  </Link>
                ) : (
                  <Link to="/login">
                    <CgProfile size={30} color="rgb(255 255 255 / 83%)" />
                  </Link>
                )}
              </div>
            </div>

            {/* SIgn up */}
            <div className={`${styles.normalFlex} `} title="Sign up">
              <div className="relative cursor-pointer mr-[15px] ml-4">
                <Link to="/sign-up">
                  <FaDoorOpen size={30} color="rgb(255 255 255 / 83%)" />
                </Link>
              </div>
            </div>
            {/* log out */}
            {isAuthenticated ? (
              <div
                className={`${styles.normalFlex} `}
                title="Log out"
                onClick={() => {
                  logoutHandler();
                }}
              >
                <div className="relative cursor-pointer mr-[15px] ml-4">
                  <IoLogOut size={30} color="rgb(255 255 255 / 83%)" />
                </div>
              </div>
            ) : null}

            {/* cart popup */}

            {openCart ? <Cart setOpenCart={setOpenCart} /> : null}
            {/* wishlist popup */}
            {openWishlist ? <Wishlist setOpenWishlist={setOpenWishlist} /> : null}
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
