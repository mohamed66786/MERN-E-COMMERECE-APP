import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "../../styles/style";

const DropDown = ({ categoriesData, setDropDown }) => {
  const navigate = useNavigate();
  const submitHandle = (item) => {
    navigate(`/products?category=${item.title}`);
    setDropDown(false);
    window.location.reload();
  };

  return (
    <div className="pb-4 w-[270px] bg-[#fff] absolute z-30 rounded-b-md shadow-sm ">
      {categoriesData &&
        categoriesData.map((item, index) => {
          return (
            <div
              key={index}
              className={`${styles.normalFlex} hover:bg-slate-300`}
              onClick={() => submitHandle(item)}
            >
              <img
                src={item.image_Url}
                style={{
                  width: "25px",
                  height: "px",
                  objectFit: "contain",
                  marginLeft: "none",
                }}
                alt=""
              />
              <h3 className="m-3 cursor-pointer select-none">{item.title}</h3>
            </div>
          );
        })}
    </div>
  );
};

export default DropDown;
