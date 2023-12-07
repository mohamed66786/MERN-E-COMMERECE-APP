// import React, { useState } from "react";
import { AiOutlineLogin, AiOutlineMessage } from "react-icons/ai";
import { TbAddressBook } from "react-icons/tb";
import { HiOutlineReceiptRefund, HiOutlineShoppingBag } from "react-icons/hi";
import { MdOutlineTrackChanges } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";
import { RxPerson } from "react-icons/rx";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { server } from "../../backendServer";
import { toast } from "react-toastify";
import { useState } from "react";
import PopUpCheck from "./../Layout/PopUpCheck";

const ProfileSidebar = ({ active, setActive }) => {
  const navigate = useNavigate();
  const [check, setCheck] = useState(false);
  const [logout, setLogout] = useState(false);

  const logoutHandler = () => {
    if (logout === false) {
      toast.error("User not logged out");
    } else if (logout === true) {
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
  if (logout) {
    logoutHandler();
  }
  if (logout === "close") {
    setCheck(false);
    setLogout(false);
  }

  return (
    <div>
      {check ? <PopUpCheck setLogout={setLogout} setCheck={setCheck} /> : null}
      <div className="w-full bg-white shadow-sm rounded-[10px] p-4 pt-8">
        <div
          className="flex items-center cursor-pointer w-full mb-8"
          onClick={() => setActive(1)}
          title="profile"
        >
          <RxPerson size={20} color={active === 1 ? "red" : ""} />
          <span
            className={`pl-3 ${
              active === 1 ? "text-[red]" : ""
            } 800px:block hidden`}
          >
            Profile
          </span>
        </div>
        <div
          className="flex items-center cursor-pointer w-full mb-8"
          onClick={() => setActive(2)}
          title="orders"
        >
          <HiOutlineShoppingBag size={20} color={active === 2 ? "red" : ""} />
          <span
            className={`pl-3 ${
              active === 2 ? "text-[red]" : ""
            } 800px:block hidden`}
          >
            Orders
          </span>
        </div>

        <div
          className="flex items-center cursor-pointer w-full mb-8"
          onClick={() => setActive(3)}
          title="refunds"
        >
          <HiOutlineReceiptRefund size={20} color={active === 3 ? "red" : ""} />
          <span
            className={`pl-3 ${
              active === 3 ? "text-[red]" : ""
            } 800px:block hidden`}
          >
            Refunds
          </span>
        </div>

        <div
          className="flex items-center cursor-pointer w-full mb-8"
          onClick={() => setActive(4) || navigate("/inbox")}
          title="inbox"
        >
          <AiOutlineMessage size={20} color={active === 4 ? "red" : ""} />
          <span
            className={`pl-3 ${
              active === 4 ? "text-[red]" : ""
            } 800px:block hidden`}
          >
            Inbox
          </span>
        </div>

        <div
          className="flex items-center cursor-pointer w-full mb-8"
          onClick={() => setActive(5)}
          title="track order"
        >
          <MdOutlineTrackChanges size={20} color={active === 5 ? "red" : ""} />
          <span
            className={`pl-3 ${
              active === 5 ? "text-[red]" : ""
            } 800px:block hidden`}
          >
            Track Order
          </span>
        </div>

        <div
          className="flex items-center cursor-pointer w-full mb-8"
          onClick={() => setActive(6)}
          title="change password"
        >
          <RiLockPasswordLine size={20} color={active === 6 ? "red" : ""} />
          <span
            className={`pl-3 ${
              active === 6 ? "text-[red]" : ""
            } 800px:block hidden`}
          >
            Change Password
          </span>
        </div>

        <div
          className="flex items-center cursor-pointer w-full mb-8"
          onClick={() => setActive(7)}
          title="adress"
        >
          <TbAddressBook size={20} color={active === 7 ? "red" : ""} />
          <span
            className={`pl-3 ${
              active === 7 ? "text-[red]" : ""
            } 800px:block hidden`}
          >
            Address
          </span>
        </div>

        <div
          className="single_item flex items-center cursor-pointer w-full mb-8"
          onClick={() => {
            setActive(8);
            setCheck(true);
            // logoutHandler();
          }}
          title="log out"
        >
          <AiOutlineLogin size={20} color={active === 8 ? "red" : ""} />
          <span
            className={`pl-3 ${
              active === 8 ? "text-[red]" : ""
            } 800px:block hidden`}
          >
            Log out
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProfileSidebar;
