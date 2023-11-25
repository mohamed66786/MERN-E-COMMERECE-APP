import { useState } from "react";
import { FaArrowUp } from "react-icons/fa";

const Scroll = () => {
  const [visible, setVisible] = useState(false);

  const toggleVisible = () => {
    const scrolled = document.documentElement.scrollTop;
    // console.log(scrolled)
    if (scrolled > 600) {
      setVisible(true);
    } else if (scrolled <= 30) {
      setVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
      /* you can also use 'auto' behaviour 
         in place of 'smooth' */
    });
  };

  window.addEventListener("scroll", toggleVisible);
  return (
    <div
      className={`w-10 h-10 rounded-full bg-[orange] fixed ${
        visible ? "flex" : "hidden"
      }
      font-bold text-[25px] text-center z-10
    justify-center right-5 bottom-5 cursor-pointer hover:bg-[#88ff00]`}
      onClick={scrollToTop}
    >
      <FaArrowUp className="mt-1 " />
    </div>
  );
};

export default Scroll;
