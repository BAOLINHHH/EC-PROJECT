import React from 'react'
import Dialog from "@mui/material/Dialog";
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import { MdCancel } from "react-icons/md";

export default function AddProduct(props){
  const handlingCloseDialog =  () => {
     props.handleClose();
  };
  return (
    <>
      <Dialog
      open={props.isOpen}
      onClose={handlingCloseDialog}
      fullWidth={true}
      maxWidth="md"
      >
        <DialogTitle className=" flex bg-[#2d3748] justify-center items-center relative">
          <span className='text-[20px] text-[#fff]'>Thêm sản phẩm</span>
          <div className='flex  absolute right-[5px] text-[#fff] cursor-pointer' onClick={props.handleClose} >
            <MdCancel size={30}/>
          </div>
        </DialogTitle>
        <DialogContent>
          <div className='mb-3'>
            <span>Hình ảnh</span>
          </div>
          <div className="flex items-center mb-3">
            <span className="w-[250px]">Tên sản phẩm: </span>
            <input type="text" className=" w-[500px] outline-none h-[40px] border-[1px] border-[#32e9e9] border-solid text-[#0f0303]  text-[17px]  p-[10px] rounded-[5px]  focus:ring-[#9b3bea] focus:border-[#3e3bd5]"    placeholder="Tên sản phẩm" />
          </div>
          <div className="flex items-center mb-3">
            <span className="w-[250px]">Só lượng sản phẩm </span>
            <input type="text" className=" w-[500px] outline-none h-[30px] border-[1px] border-[#32e9e9] border-solid text-[#0f0303]  text-[17px]  p-[10px] rounded-[5px]  focus:ring-[#9b3bea] focus:border-[#3e3bd5]"    placeholder="Tên sản phẩm" />
          </div>
          <div className="flex items-center mb-3">
            <span className="w-[250px]">Giá sản phẩm: </span>
            <input type="text" className=" w-[500px] outline-none h-[30px] border-[1px] border-[#32e9e9] border-solid text-[#0f0303]  text-[17px]  p-[10px] rounded-[5px]  focus:ring-[#9b3bea] focus:border-[#3e3bd5]"    placeholder="Tên sản phẩm" />
          </div>
          <div className="flex items-center mb-3">
            <span className="w-[250px]">Thể loại: </span>
            <input type="text" className=" w-[500px] outline-none h-[30px] border-[1px] border-[#32e9e9] border-solid text-[#0f0303]  text-[17px]  p-[10px] rounded-[5px]  focus:ring-[#9b3bea] focus:border-[#3e3bd5]"    placeholder="Tên sản phẩm" />
          </div>
          <div className="flex items-center mb-3">
            <span className="w-[250px]">Tên tác giả: </span>
            <input type="text" className=" w-[500px] outline-none h-[40px] border-[1px] border-[#32e9e9] border-solid text-[#0f0303]  text-[17px]  p-[10px] rounded-[5px]  focus:ring-[#9b3bea] focus:border-[#3e3bd5]"    placeholder="Tên sản phẩm" />
          </div>
          <div className="flex items-center mb-3">
            <span className="w-[250px]">Nhà xuất bản: </span>
            <input type="text" className=" w-[500px] outline-none h-[40px] border-[1px] border-[#32e9e9] border-solid text-[#0f0303]  text-[17px]  p-[10px] rounded-[5px]  focus:ring-[#9b3bea] focus:border-[#3e3bd5]"    placeholder="Tên sản phẩm" />
          </div>
          <div className="flex items-center mb-3">
            <span className="w-[250px]">Hình thức: </span>
            <input type="text" className=" w-[500px] outline-none h-[40px] border-[1px] border-[#32e9e9] border-solid text-[#0f0303]  text-[17px]  p-[10px] rounded-[5px]  focus:ring-[#9b3bea] focus:border-[#3e3bd5]"    placeholder="Tên sản phẩm" />
          </div>
          <div className="flex items-center mb-3">
            <span className="w-[250px]">Ngôn ngữ: </span>
            <input type="text" className=" w-[500px] outline-none h-[40px] border-[1px] border-[#32e9e9] border-solid text-[#0f0303]  text-[17px]  p-[10px] rounded-[5px]  focus:ring-[#9b3bea] focus:border-[#3e3bd5]"    placeholder="Tên sản phẩm" />
          </div>
          <div className="flex items-center mb-3">
            <span className="w-[250px]">Số trang: </span>
            <input type="text" className=" w-[500px] outline-none h-[40px] border-[1px] border-[#32e9e9] border-solid text-[#0f0303]  text-[17px]  p-[10px] rounded-[5px]  focus:ring-[#9b3bea] focus:border-[#3e3bd5]"    placeholder="Tên sản phẩm" />
          </div>
          <div className='flex justify-center'>
            <button className=' border-solid w-[50px] rounded-[7px] bg-[#2d3748] text-[#fff]'>
              Lưu
            </button>
          </div>
        </DialogContent>
        
      </Dialog>
    </>
  )
}