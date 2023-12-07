import React, { useEffect } from "react";
import styles from "../../styles/style";

const PopUpCheck = ({ setLogout, setCheck }) => {
  const handleTrue = () => {
    setLogout(true);
  };
  const handleFalse = () => {
    setLogout("close");
  };
  useEffect(() => {
    document.getElementById("element").focus();
  }, []);
  return (
    <div>
      <div
        className="fixed w-full h-screen top-0 left-0 bg-[#aba4a430] z-40 
        flex items-center justify-center"
      >
        <div
          className="w-[80%] 800px:w-[30%]  h-[30vh] 
          800px:h-[30vh]   rounded-3xl 
             bg-[#1877F2]  shadow-sm relative p-4 outline-none"
          id="element"
          tabIndex={0}
          // onBlur={() => setCheck(false)}
        >
          <h
            className="text-white w-full flex
             justify-center text-[30px] "
          >
            Are You Sure?
          </h>
          <div>
            <div className="flex justify-around  mt-[20%] ">
              <div
                className={`${styles.button} bg-[blue] text-white`}
                onClick={handleFalse}
              >
                No
              </div>
              <div
                className={`${styles.button} bg-[blue] text-white`}
                onClick={handleTrue}
              >
                Yes
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PopUpCheck;
