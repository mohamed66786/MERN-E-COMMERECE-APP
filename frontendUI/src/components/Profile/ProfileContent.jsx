import React, { useEffect, useState } from 'react'
import { AiOutlineCamera } from 'react-icons/ai'
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import styles from './../../styles/style';
import AllOrders from './profileContentComponents/AllOrders';
import AllRefundOrders from './profileContentComponents/AllRefundOrders';
import TrackOrder from './profileContentComponents/TrackOrder';
import ChangePassword from './profileContentComponents/ChangePassword';
import Address from './profileContentComponents/Address';

const ProfileContent = ({active}) => {
  const dispatch=useDispatch()
  const { user, error, successMessage } = useSelector((state) => state.user);


  const [name,setName]=useState("");
  const [email,setEmail]=useState("");
  const [phoneNumber,setPhoneNumber]=useState("");
  const [password,setPassword]=useState("");
  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch({ type: "clearErrors" });
    }
    if (successMessage) {
      toast.success(successMessage);
      dispatch({ type: "clearMessages" });
    }
  }, [error, successMessage]);

  
  return (
    <div className='w-full'>
        {/* profile */}
        {
          active===1 &&(
            <>
            <div className="flex justify-center w-full">
              <div className="relative">
                <img
                  src={`https://t4.ftcdn.net/jpg/03/64/21/11/360_F_364211147_1qgLVxv1Tcq0Ohz3FawUfrtONzz8nq3e.jpg`}
                  className="w-[150px] h-[150px] rounded-full object-cover border-[3px] border-[#3ad132]"
                  alt=""
                />
                <div className="w-[30px] h-[30px] bg-[#E3E9EE] rounded-full flex items-center justify-center 
                cursor-pointer hover:bg-gray-300 absolute bottom-[5px] right-[5px]">
                  <input
                    type="file"
                    id="image"
                    className="hidden"
                    // onChange={handleImage}
                  />
                  <label htmlFor="image">
                    <AiOutlineCamera className='cursor-pointer' />
                  </label>
                </div>
              </div>
            </div>
            <br />
            <br />
            
            {/* form part */}
            <div className="w-full px-5">
              <form >
                <div className="w-full 800px:flex block pb-3">
                  <div className=" w-[100%] 800px:w-[50%]">
                    <label className="block pb-2">Full Name</label>
                    <input
                      type="text"
                      className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
                      required
                      placeholder='Your Name'
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                  <div className=" w-[100%] 800px:w-[50%]">
                    <label className="block pb-2">Email Address</label>
                    <input
                      type="text"
                      className={`${styles.input} !w-[95%] mb-1 800px:mb-0`}
                      required
                      placeholder='Your email address'
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                </div>
  
                <div className="w-full 800px:flex block pb-3">
                  <div className=" w-[100%] 800px:w-[50%]">
                    <label className="block pb-2">Phone Number</label>
                    <input
                      type="number"
                      className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
                      required
                      placeholder='Your phone number'
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                    />
                  </div>
  
                  <div className=" w-[100%] 800px:w-[50%]">
                    <label className="block pb-2">Enter your password</label>
                    <input
                      type="password"
                      className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
                      required
                      placeholder='Your password'
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                </div>
                <input
                  className={`w-[250px] h-[40px] border border-[#3a24db] text-center 
                  text-[#3a24db] rounded-[3px] mt-8 cursor-pointer hover:bg-[blue] hover:text-white`}
                  required
                  value="Update"
                  type="submit"
                />
              </form>
            </div>
          </>
          )
        }

         {/* order */}
      {active === 2 && (
        <div>
          <AllOrders />
        </div>
      )}

      {/* Refund */}
      {active === 3 && (
        <div>
          <AllRefundOrders />
        </div>
      )}

      {/* Track order */}
      {active === 5 && (
        <div>
          <TrackOrder />
        </div>
      )}

      {/* Change Password */}
      {active === 6 && (
        <div>
          <ChangePassword />
        </div>
      )}

      {/*  user Address */}
      {active === 7 && (
        <div>
          <Address />
        </div>
      )}

    </div>
  )
}

export default ProfileContent