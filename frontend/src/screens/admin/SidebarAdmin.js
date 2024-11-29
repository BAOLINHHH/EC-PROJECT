import React, { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import Avatar from '@mui/material/Avatar';
import { sidebarAdminData } from '../../utils/sidebarAdminData';
import { IoIosLogOut } from "react-icons/io";
const SidebarAdmin = () => {
   
  return (
    <>
    <div className=" border-r-[0.5px] border-solid">
      <div className="flex flex-col items-center">
      <span className="relative left-[100px]"><IoIosLogOut size={20}/></span>
        <Avatar>M</Avatar>
        <span>name</span>
        <span>name</span>
      </div>
      <hr />
      <div className="pl-[15px] mt-[10px]">
        <ul>
          {sidebarAdminData.map((item, index) =>(
            <NavLink to = {item.path}  className="active-Admin" key={index}
            >
            <li className="flex mb-[15px] items-center hover:bg-[#dc4f36] hover:text-[#fff]  w-[190px] rounded-[5px] pl-4">
              <span>  {item.icon} </span>
              <span className="ml-[10px] text-[17px] cursor-pointer">{item.title}</span>
            </li>
            </NavLink>
          ))}
          {/* <li className='flex mb-[5px] '>
            <FaHome/>
            <span>
              dashboard
            </span>
          </li>
        <li className="flex mb-[5px]">
          <FaUsers/> 
          <span>
          Users
          </span>
        </li>
        <li className="flex mb-[5px]">
          <FaArchive/>
          <span>
            product
          </span>
        </li>
        <li className="flex">
          <FaReceipt/>
          <span>
          Receipt
          </span>
        </li>
        <li className="flex">
          <RiCoupon2Fill />
          <span>
          RiCoupon
          </span>
        </li> */}

      </ul>
      </div>
      
    </div>
    
        {/* <div className="sidebar-wrapper">
            <nav id="sidebar">
                <ul className="list-unstyled components">
                    <li>
                        <Link to="/admin/dashboard">Dashboard</Link>
                    </li>
                    <li> */}
                        {/* <Link href="#productSubmenu" data-toggle="collapse" aria-expanded="false" className="dropdown-toggle-admin"> Products</Link>
                        <ul className="collapse list-unstyled" id="productSubmenu">
                            <li>
                                <Link to="/admin/products"> All</Link>
                            </li>

                            <li>
                                <Link to="/admin/product"> Create</Link>
                            </li>
                        </ul> */}
                        {/* <Link to="/admin/productlist">Thông tin các sản phẩm</Link>
                    </li>

                    <li>
                        <Link to="/admin/orderlist">Thông tin các đơn hàng</Link>
                    </li>

                    <li>
                        <Link to="/admin/userlist">Thông tin các tài khoản</Link>
                    </li> */}

                    {/* <li>
                        <Link to="/admin/reviews">Thông tin các đánh giá</Link>
                    </li> */}

                {/* </ul>
            </nav>
        </div> */}
        
    </>
  )
}

export default SidebarAdmin