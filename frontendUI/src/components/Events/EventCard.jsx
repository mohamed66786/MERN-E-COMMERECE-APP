import { Link } from "react-router-dom";
import styles from "../../styles/style";
import CountDown from "./CountDown.jsx";
import { productData } from "../../static/data.js";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { addTocart } from './../../redux/actions/cart';

const EventCard = ({ active }) => {

  const {cart}=useSelector(state=>state.cart);
  const dispatch=useDispatch();


  const data = productData.find(
    (a) => a.name === "Iphone 14 pro max 256 gb ssd and 8 gb ram silver colour"
  );
    console.log(data)
const addToCartHandler=()=>{
  const isExist=cart&&cart.find(item=>item.id ===data.id);
  if(isExist){
    toast.error("Item already exists!");
  }
  else{
    const cartData={...data,qty:1};
    dispatch(addTocart(cartData));
    toast.success("Item added successfully");
  }
}

  return (
    <div
      className={`w-full block bg-white rounded-lg${
        active ? "unset" : "mb-12"
      } lg:flex p-2`}
    >
      <div className="w-full lg:-w[50%] m-auto">
        <img src="https://m.media-amazon.com/images/I/31Vle5fVdaL.jpg" alt="" />
      </div>
      <div className="w-full lg:[w-50%] flex flex-col justify-center">
        <h2 className={`${styles.productTitle}`}>
          Iphone 14 pro max 256 gb ssd and 8 gb ram silver colour{" "}
        </h2>
        <p>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aut sequi
          eum libero quibusdam ad tempora facilis ex corrupti? Facilis magnam
          nemo esse saepe quidem assumenda, id for that doloremque iure error
          sunt amet? Reiciendis cupiditate ullam, fuga quae beatae facere
          aliquid quam nulla impedit est fugit odio eum. Unde aliquid nulla
          praesentium alias voluptatem enim nostrum beatae obcaecati quos,
          aperiam atque illo omnis! Atque minus cupiditate ducimus, et incidunt
          aperiam, nesciunt sed distinctio maiores, vel beatae labore? Impedit
          aspernatur fugiat nobis nemo!
        </p>
        <div className="flex py-2 justify-between">
          <div className="flex">
            <h5 className="font-[500] text-[18px] text-[#d55b45] pr-3 line-through">
              1099$
            </h5>
            <h5 className="font-bold text-[20px] text-[#333] font-Roboto">
              999$
            </h5>
          </div>
          <span className="pr-3 font-[400] text-[17px] text-[red]">
            120 Sold
          </span>
        </div>
        <CountDown />
        <br />
        <div className="flex items-center">
        <Link to={`/product/${data._id}?isEvent=true`}>
            <div className={`${styles.button} text-[#fff]`}>See Details</div>
          </Link>
          <div
            className={`${styles.button} text-[#fff] ml-5`}
            onClick={() => addToCartHandler(data)}
          >
            Add to cart
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
