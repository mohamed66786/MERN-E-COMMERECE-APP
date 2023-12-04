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
import { useSelector } from "react-redux";
import { IoLogOut } from "react-icons/io5";
import axios from "axios";
import { server } from "../../backendServer.js";
import { toast } from "react-toastify";
import { FaDoorOpen } from "react-icons/fa6";
import Cart from "../Cart/Cart.jsx";
import Wishlist from "../Wishlist/Wishlist.jsx";
import { RxCross1 } from "react-icons/rx";

const Header = ({ activeHeading }) => {
  const { isAuthenticated } = useSelector((state) => state.user);
  const { cart } = useSelector((state) => state.cart);
  const { wishlist } = useSelector((state) => state.wishlist);

  const [searchValue, setSearchValue] = useState("");
  const [searchData, setSearchData] = useState(null);
  const [active, setActive] = useState(false);
  const [dropDown, setDropDown] = useState(false);
  const [focus, setFocus] = useState(true);
  const [openCart, setOpenCart] = useState(false);
  const [openWishlist, setOpenWishlist] = useState(false);
  const [open, setOpen] = useState(false);

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
    const check = window.prompt("Are you sure you want to log out?","no");
     if(check===null){
      toast.error("User not logged out");
    }
   else if (check.toLocaleLowerCase()==="yes"||check.toLocaleLowerCase()==="y") {
      axios
        .get(`${server}/user/logout`, { withCredentials: true })
        .then(() => {
          toast.success(`User logged out successfully`);
          navigate("/login");
          setTimeout(() => {
            window.location.reload();
          }, 2000);
        })
        .catch(() => {
          toast.error(`User logout failed`);
        });
    }
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
        <div
          className="hidden 800px:h-[30px] 800px:my-[20px] 800px:flex items-center
         justify-between"
        >
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
                setTimeout(() => {
                  setFocus(false);
                  setSearchValue("");
                }, 100);
              }}
              onFocus={() => setFocus(true)}
            />
            <AiOutlineSearch
              size={30}
              className="absolute right-2 top-1.5 cursor-pointer"
            />

            {/* after write what searchin for */}
            {searchData && searchData.length !== 0 && searchValue && focus ? (
              <div className="absolute min-h-[30vh]  shadow-sm-2 z-[9] p-4 bg-white">
                {searchData &&
                  searchData.map((item, index) => {
                    return (
                      <Link
                        to={`/product/${item._id}`}
                        className="bg-gray-400 "
                        key={index}
                      >
                        <div
                          className="w-full flex mb-2 p-1 items-start-py-
                         hover:bg-gray-300 "
                        >
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
            <Link to="/shop-create">
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
                    {/* <CgProfile size={30} color="rgb(255 255 255 / 83%)" /> */}
                    <h1
                      className="text-white mr-10 hover:text-[blue]"
                      title="login"
                    >
                      Login
                    </h1>
                  </Link>
                )}
              </div>
            </div>

            {/* wishlist */}
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
                  {wishlist && wishlist.length}
                </span>
              </div>
            </div>

            {/* shoping cart */}

            <div className={`${styles.normalFlex} `} title="shoping cart">
              <div
                className="relative cursor-pointer mr-[15px]"
                onClick={() => setOpenCart(true)}
              >
                <AiOutlineShoppingCart
                  size={30}
                  color="rgb(255 255 255 / 83%)"
                />
                <span
                  className="absolute right-0 top-0 rounded-full bg-[#ff3d3d] w-4 h-4
                 top right p-0 m-0 text-white font-mono text-[12px] leading-tight text-center"
                >
                  {cart && cart.length}
                </span>
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
            {openWishlist ? (
              <Wishlist setOpenWishlist={setOpenWishlist} />
            ) : null}
          </div>
        </div>
      </div>

      {/* mobile header */}

      <div
        className={`${
          active === true ? "shadow-sm fixed top-0 left-0 z-10" : null
        }
      w-full h-[60px] bg-[#fff] z-50 top-0 left-0 shadow-sm 800px:hidden`}
      >
        <div className="w-full flex items-center justify-between">
          <div>
            <BiMenuAltLeft
              size={40}
              className="ml-4 mt-2 cursor-pointer hover:text-[red]"
              onClick={() => setOpen(true)}
            />
          </div>

          <div>
            <Link to="/">
              <img
                src="https://shopo.quomodothemes.website/assets/images/logo.svg"
                alt=""
                className="mt-3 cursor-pointer"
              />
            </Link>
          </div>

          <div>
            <div
              className="relative mr-[20px]"
              onClick={() => setOpenCart(true)}
            >
              <AiOutlineShoppingCart size={30} />
              <span
                className="absolute right-0 top-0 rounded-full bg-[red] w-4 h-4 top 
              right p-0 m-0 text-white font-mono text-[12px]  leading-tight text-center"
              >
                {cart && cart.length}
              </span>
            </div>
          </div>
        </div>

        {/* header sidebar */}

        {open && (
          <div
            className={`fixed w-full bg-[#0000005f] z-20 h-full top-0 left-0`}
          >
            <div className="fixed w-[70%] bg-[#fff] h-screen top-0 left-0 z-10 overflow-y-scroll">
              <div className="w-full justify-between flex pr-3">
                <div>
                  <div
                    className="relative mr-[15px]"
                    onClick={() => setOpenWishlist(true) || setOpen(false)}
                  >
                    <AiOutlineHeart size={30} className="mt-5 ml-3" />
                    <span
                      class="absolute right-0 top-0 rounded-full 
                    bg-[red] w-4 h-4 top right p-0 m-0 text-white font-mono text-[12px]  leading-tight text-center"
                    >
                      3
                    </span>
                  </div>
                </div>
                <RxCross1
                  size={30}
                  className="ml-4 mt-5 cursor-pointer hover:text-[red]"
                  onClick={() => setOpen(false)}
                />
              </div>

              <div className="my-8 w-[92%] m-auto h-[40px relative]">
                <input
                  type="search"
                  placeholder="Search Product..."
                  className="h-[40px] w-full px-2 border-[#3957db] border-[2px] rounded-md"
                  value={searchValue}
                  onChange={handleSearchChange}
                  onBlur={() => {
                    setFocus(false);
                    setSearchValue("");
                  }}
                  onFocus={() => setFocus(true)}
                />
                {searchData &&
                searchData.length !== 0 &&
                searchValue &&
                focus ? (
                  <div className="absolute bg-[#d5d5d5] z-10 shadow w-full left-0 p-3">
                    {searchData.map((i, index) => {
                      const d = i.name;

                      const Product_name = d.replace(/\s+/g, "-");
                      return (
                        <Link to={`/product/${Product_name}`} key={index}>
                          <div className="flex items-center hover:bg-slate-50">
                            <img
                              src={i.image_Url[0]?.url}
                              alt=""
                              className="w-[50px] mr-2"
                            />
                            <h5>{i.name}</h5>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                ) : null}
              </div>

              <Navbar active={activeHeading} />
              <div className={`${styles.button} ml-4 !rounded-[4px]`}>
                <Link to="/shop-create">
                  <h1 className="text-[#fff] flex items-center">
                    Become Seller <IoIosArrowForward className="ml-1" />
                  </h1>
                </Link>
              </div>
              <br />
              <br />
              <br />

              <div className="flex w-full justify-center">
                {isAuthenticated ? (
                  <div>
                    <Link to="/profile">
                      <img
                        src={`https://t4.ftcdn.net/jpg/03/64/21/11/360_F_364211147_1qgLVxv1Tcq0Ohz3FawUfrtONzz8nq3e.jpg`}
                        alt=""
                        className="w-[60px] h-[60px] rounded-full border-[3px] border-[#0eae88]"
                      />
                    </Link>
                  </div>
                ) : (
                  <>
                    <Link
                      to="/login"
                      className="text-[18px] pr-[10px] text-[#000000b7] hover:text-[blue]"
                    >
                      Login /
                    </Link>
                    <Link
                      to="/sign-up"
                      className="text-[18px] text-[#000000b7] hover:text-[blue]"
                    >
                      Sign up
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Header;
