import  { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Header from './../components/layouts/Header';
import Loader from "../components/Layout/Loader.jsx";
import styles from "../styles/style.js";
import ProfileSideBar from "../components/Profile/ProfileSidebar.jsx";
import ProfileContent from "../components/Profile/ProfileContent.jsx";


const ProfilePage = () => {
  const navigate = useNavigate();
  const { isAuthenticated,loading } = useSelector((state) => state.user);
  const [active, setActive] = useState(1);
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
      window.location.reload();
    }
  });
  return (
    <div>
      {loading ? (
        <Loader />
      ) : (
        <>
          <Header />
          <div className={`${styles.section} flex bg-[#f5f5f5] py-10`}>
            <div className="w-[50px] 800px:w-[335px] sticky 800px:mt-0 mt-[18%]">
              <ProfileSideBar active={active} setActive={setActive} />
            </div>
            <ProfileContent active={active} />
          </div>
        </>
      )}
    </div>
  );
};

export default ProfilePage;
