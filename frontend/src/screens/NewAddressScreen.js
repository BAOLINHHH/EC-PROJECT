import React from 'react'
import SidebarUser from './SidebarUser';
import { AiFillBackward } from "react-icons/ai";
import {  Link} from 'react-router-dom';
const NewAddressScreen = () => {
  return (
    <>
         <section className="py-3">
        <div className="container ">
        <div className=" flex gap-[60px]">
                <div className="w-[280px] shadow-[1px_1px_7px_rgba(#00000029)] ">
                    <SidebarUser/>
                </div>
                <div className=" border-solid border-[1px] rounded-[6px] w-full bg-[#fff] shadow-[1px_1px_7px_rgba(#00000029)] ">
                  <div className="px-[10px] py-[5px] ]">
                        <div className='w-full mb-[10px] flex items-center justify-between'>
                            <h1 className="font-[600] text-[20px] p-[10px]">Thêm địa chỉ</h1>
                        </div>
                        <div className="px-[20px]">
                           
                                <div className='flex w-[600px] pb-3'>
                                    <span className="w-[250px] p-[10px] ">Họ tên</span>
                                    <div className=" input-group ">
                                    <input type="text" className="form-control"  placeholder="Tên nguoi dung" />
                                </div>
                                </div>
                                <div className='flex w-[600px] pb-3'>
                                    <span className="w-[250px] p-[10px]">Số điện thoại</span>
                                    <div className=" input-group">
                                    <input type="text" className="form-control"  placeholder="Tên nguoi dung" />
                                    </div>
                                </div>
                                <div className='flex w-[600px] pb-3'>
                                    <span className="w-[250px] p-[10px] ">Tỉnh/Thành phố</span>
                                    <div className=" input-group ">
                                    <input type="text" className="form-control"  placeholder="Tên nguoi dung" />
                                    </div>
                                </div>
                                <div className='flex w-[600px] pb-3'>
                                    <span className="w-[250px] p-[10px] ">Quận/Huyện</span>
                                    <div className=" input-group ">
                                    <input type="text" className="form-control"  placeholder="Tên nguoi dung" />
                                    </div>
                                </div>
                                <div className='flex w-[600px] pb-3'>
                                    <span className="w-[250px] p-[10px] ">Xã/Phường</span>
                                    <div className=" input-group ">
                                    <input type="text" className="form-control"  placeholder="Tên nguoi dung" />
                                    </div>
                                </div>
                                <div className='flex w-[600px] pb-3'>
                                    <span className="w-[250px] p-[10px] ">Địa chỉ</span>
                                    <div className=" input-group ">
                                    <input type="text" className="form-control"  placeholder="Tên nguoi dung" />
                                    </div>
                                </div>
                                <div className="flex my-9">
                                    <Link to= '/address'>
                                    <div className="flex items-center ">
                                        <AiFillBackward className="text-[#4226e2]"/>
                                        <p className="text-[15px] text-[#4226e2] ">Quay lại</p>
                                    </div>
                                    </Link>
                                    <button type="button" class="btn btn-danger py-0 px-[20px] relative left-[400px]">Lưu</button>
                                </div>
                            </div>    
                        
                  </div>
                  
                </div>

        </div>
          
        </div>
        </section>
    </>
  )
}

export default NewAddressScreen