import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import DashboardHeader from "../../components/Shop/Layout/DashboardHeader.jsx";
import DashboardSideBar from "../../components/Shop/Layout/DashboardSideBar.jsx";
import Loader from "./../../components/Layout/Loader";
const ShopDashboardPage = () => {
  const navigate = useNavigate();
  const {  isLoading,isSeller } = useSelector((state) => state.seller);

  useEffect(() => {
    if (!isSeller) {
      navigate("/shop-login");
    }
  });
  if (isLoading) {
    return <Loader />;
  } else {
    return (
      <div>
        <DashboardHeader />
        <div className="flex items-start justify-between w-full">
          <div className="w-[80px] 800px:w-[330px]">
            <DashboardSideBar active={1} />
          </div>
        </div>
      </div>
    );
  }
};

export default ShopDashboardPage;
