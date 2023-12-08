import  { useEffect, useState } from 'react'
import Header from './../components/layouts/Header';
import Footer from './../components/layouts/Footer';
import ProductDetails from "../components/Products/ProductDetails.jsx"
import SuggestedProduct from "../components/Products/SuggestedProduct.jsx"

import { productData } from '../static/data.js';
import { useParams } from 'react-router-dom';

const ProductDetailsPage = () => {
  const {name}=useParams();
  const [data,setData]=useState("");
  const productName=name.replaceAll(/-/g," ");
  // console.log(productName)
  useEffect(()=>{
    const dataSelected=productData.find((item)=>item.name===productName);
    // console.log(data)
     setData(dataSelected)
  },[productName])

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