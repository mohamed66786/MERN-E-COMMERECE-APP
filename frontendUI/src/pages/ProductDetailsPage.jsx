import  { useEffect, useState } from 'react'
import Header from './../components/layouts/Header';
import Footer from './../components/layouts/Footer';
import ProductDetails from "../components/Products/ProductDetails.jsx"
import SuggestedProduct from "../components/Products/SuggestedProduct.jsx"

import { productData } from '../static/data.js';
import { useParams } from 'react-router-dom';

const ProductDetailsPage = () => {
  const {name}=useParams();
  const [data,setData]=useState(null);
  const productName=name.replace(/-/g," ");
  // console.log(productName)
  useEffect(()=>{
    const data=productData.find((item)=>item.name===productName);
    // console.log(data)
     setData(data)
  },[])

  return (
    <div>
        <Header/>
        <ProductDetails data={data}/>
        {data && <SuggestedProduct data={data} />}
        <Footer/>
    </div>
  )
}

export default ProductDetailsPage