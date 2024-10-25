import React, { useState } from 'react'
import {BsPerson ,BsReceipt,BsChevronDown } from 'react-icons/bs';
import { IoIosLogOut } from "react-icons/io";
import{ AiOutlineEnvironment  } from "react-icons/ai";
import { TbHandClick, TbPasswordUser } from "react-icons/tb";
import {  NavLink,useNavigate } from 'react-router-dom';
import { useLogoutMutation } from '../slices/usersApiSlice';
import {  useDispatch} from 'react-redux'; 
import {logout} from '../slices/authSlice';
const SidebarUser = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [logoutApiCall]= useLogoutMutation();
    const logoutHandler = async () =>{
        try {
            await logoutApiCall().unwrap()
            dispatch(logout())
            navigate('/login')
        } catch (err){
            console.log(err)
        
       }
    }
    
  return (
    <>
        <div className="border-solid border-[1px] rounded-[6px] bg-[#fff] ">
            <ul >
                <li className="pb-2">
                    <NavLink to = '/profile' activeClassName="active" className="flex items-center">
                        <BsPerson className="mx-2"/>
                        <span className="text-[17px]"> Hồ sơ của tôi</span>
                    {/* <BsChevronDown className="pl-1 cursor-pointer " onClick={()=>setSubmitOpen(!submitOpen)} /> */}
                    </NavLink>
                </li>
              
                {/* {submitOpen &&(
                    <ul>
                        <li className="flex items-center px-2">thong tin ca nhan</li>
                        <li className="flex items-center px-2" >dia chi</li>
                        <li className="flex items-center px-2">mat khau</li>
                    </ul>
                )} */}
                
                <li className="py-2" >
                    <NavLink to = "/changepassword" activeClassName="active" className="flex items-center"> 
                        <TbPasswordUser  className="mx-2"/>
                        <span  className="text-[17px]">Mật khẩu</span>
                    </NavLink>
                </li>
                <li className="py-2">
                    <NavLink to = "/address" className="flex items-center" activeClassName= "active">     
                    <AiOutlineEnvironment className="mx-2" />
                    <span className="text-[17px]"> Địa chỉ</span>
                    </NavLink>
                </li>
                <li  className="py-2">
                    <NavLink to = "/listorder"  className=" flex items-center" activeClassName="active">
                        <BsReceipt className="mx-2"/>
                        <span className="text-[17px]"> Đơn hàng của tôi</span>
                    </NavLink>
                </li>
                <li onClick={(logoutHandler)} className=" flex items-center py-2 cursor-pointer"> 
                    <IoIosLogOut className="mx-2" />
                    <span className="text-[17px]"> Đăng xuất</span>
                    
                </li>
               
            </ul>
        </div>
    </>
  )
}

export default SidebarUser