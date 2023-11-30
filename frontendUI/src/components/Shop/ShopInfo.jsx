import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { server } from "../../backendServer";
import styles from "../../styles/style";
import Loader from "../Layout/Loader";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
// import { getAllProductsShop } from "../../redux/actions/product";

const ShopInfo = ({ isOwner }) => {
  const [data, setData] = useState({});
  // const {products} = useSelector((state) => state.products);
  const [isLoading, setIsLoading] = useState(false);
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate=useNavigate();
  const { seller } = useSelector((state) => state.seller);
  console.log(seller)
  // useEffect(() => {
  //   dispatch(getAllProductsShop(id));
  //   setIsLoading(true);
  //   axios.get(`${server}/shop/get-shop-info/${id}`).then((res) => {
  //    setData(res.data.shop);
  //    setIsLoading(false);
  //   }).catch((error) => {
  //     console.log(error);
  //     setIsLoading(false);
  //   })
  // }, [])

  const logoutHandler = async () => {
    axios
      .get(`${server}/shop/logout`, {
        withCredentials: true,
      })
      .then(() => {
        toast.success("Seller logged out successfully");
        navigate("/")
        setTimeout(()=>{
          window.location.reload()
        },2000)
      });
  };

  // const totalReviewsLength =
  //   products &&
  //   products.reduce((acc, product) => acc + product.reviews.length, 0);

  // const totalRatings = products && products.reduce((acc,product) => acc + product.reviews.reduce((sum,review) => sum + review.rating, 0),0);

  // const averageRating = totalRatings / totalReviewsLength || 0;

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div>
          <div className="w-full py-5 shadow-lg">
            <div className="w-full flex item-center justify-center">
              <img
                src={`https://blog.ninjavan.co/en-ph/wp-content/uploads/sites/2/2021/11/Shopee-seller.png`}
                alt=""
                className="w-[150px] h-[150px] object-cover rounded-full"
              />
            </div>
            <h3 className="text-center py-2 text-[20px]">{seller.name}</h3>
            <p className="text-[16px] text-[#000000a6] p-[10px] flex items-center">
              {/* {seller.description}
               */}
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Incidunt
              dignissimos suscipit saepe eligendi quasi. Excepturi iure aliquid
              reprehenderit eos eligendi consequatur expedita, sint voluptatum
            </p>
          </div>
          <div className="p-3">
            <h5 className="font-[600]">Address</h5>
            <h4 className="text-[#000000a6]">{seller.address}</h4>
          </div>
          <div className="p-3">
            <h5 className="font-[600]">Phone Number</h5>
            <h4 className="text-[#000000a6]">{seller.phoneNumber}</h4>
          </div>
          <div className="p-3">
            <h5 className="font-[600]">Total Products</h5>
            304
            {/* <h4 className="text-[#000000a6]">{products && products.length}</h4> */}
          </div>
          <div className="p-3">
            <h5 className="font-[600]">Shop Ratings</h5>
            4.7
            {/* <h4 className="text-[#000000b0]">{averageRating}/5</h4> */}
          </div>
          <div className="p-3">
            <h5 className="font-[600]">Joined On</h5>
            <h4 className="text-[#000000b0]">
              {seller?.createdAt?.slice(0, 10)}
            </h4>
          </div>
          {isOwner && (
            <div className="py-3 px-4">
              <Link to="/settings">
                <div
                  className={`${styles.button} !w-full !h-[42px] !rounded-[5px]`}
                >
                  <span className="text-white">Edit Shop</span>
                </div>
              </Link>
              <div
                className={`${styles.button} !w-full !h-[42px] !rounded-[5px]`}
                onClick={logoutHandler}
              >
                <span className="text-white">Log Out</span>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default ShopInfo;
