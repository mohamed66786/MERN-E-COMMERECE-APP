import { useNavigate } from "react-router-dom";
import Login from "../components/Login/Login.jsx";
import { useSelector } from "react-redux";
import { useEffect } from "react";
// import { loadUser } from './../redux/actions/userAction';
import Header from './../components/layouts/Header';

const LoginPage = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useSelector((state) => state.user);

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
      window.location.reload();
    }
  });
  return (
    <div>
      <Header/>
      <Login />
    </div>
  );
};

export default LoginPage;
