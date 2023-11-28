import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import ShopLogin from "../../components/Shop/ShopLogin.jsx";
import Header from '../../components/layouts/Header.jsx';

const ShopLoginPage = () => {
  const navigate = useNavigate();
  const { isSeller } = useSelector((state) => state.seller);

  useEffect(() => {
    if(isSeller === true){
      navigate(`/dashboard`);
    }
  })
  return (
    <div>
      <Header/>
        <ShopLogin />
    </div>
  )
}

export default ShopLoginPage