import React from 'react'
import SidebarUser from './SidebarUser';
const ChangePassword = () => {
  return (
    <>
    <section>
        <div className="container">
        <div className=" flex gap-[60px] ">
                <div className="w-[280px] shadow-[1px_1px_7px_rgba(#00000029)]">
                    <SidebarUser/>
                </div>
                <div className=" border-solid border-[1px] rounded-[6px] w-full bg-[#fff] shadow-[1px_1px_7px_rgba(#00000029)]">
                        <div className='w-full py-4'>
                            <h1 className="font-[600] text-[20px] p-[10px]">Doi mat khau</h1>
                        </div>
                        <div className='flex w-[600px] pb-3 gap-x-[20px]'>
                            <span className="w-[240px] p-[9px] ">Mat khau hien tai</span>
                            <div className=" input-group ">
                            <input type="text" className="form-control"  placeholder="Tên nguoi dung" />
                            </div>
                        </div>
                        <div className='flex w-[600px] pb-3 gap-x-[20px]'>
                            <span className="w-[240px] p-[9px]">Mat khau moi</span>
                            <div className=" input-group">
                            <input type="text" className="form-control"  placeholder="Tên nguoi dung" />
                            </div>
                        </div>
                        <div className='flex w-[600px] pb-3'>
                            <span className="w-[270px] p-[9px] ">xac nhan mat khau moi</span>
                            <div className=" input-group ">
                            <input type="text" className="form-control"  placeholder="Tên nguoi dung" />
                            </div>
                        </div>
                        <div className="flex justify-center">
                            <button type="submit" className="btn btn-danger" >Cập nhật</button>
                        </div>
                </div>
            </div>
        </div>
    </section>
    </>
  )
}

export default ChangePassword