import React, { useRef, useState } from 'react'
import Dialog from "@mui/material/Dialog";
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import { MdCancel } from "react-icons/md";
import images from '../../assets/indexImg'
export default function AddProduct(props){
  const inputFileRef = useRef();
  const [imagePreview,setImagePreview] = useState('');
  const handlingClickUpload =()=>{
    inputFileRef.current.click();
  }

  const handleFileUpload =(e)=>{
    const file =  e.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
          setImagePreview(reader.result);
      }
  }; reader.readAsDataURL(file);
  }
  const handlingCloseDialog =  () => {
     props.handleClose();
     setImagePreview('')
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
          <div className='flex  absolute right-[5px] text-[#fff] cursor-pointer' onClick={handlingCloseDialog} >
            <MdCancel size={30}/>
          </div>
        </DialogTitle>
        <DialogContent>
          <div className='mb-3 flex'>
            <span className='w-[250px]'>Hình ảnh: </span>
            <div className='mt-2'>
            <input
                  ref={inputFileRef}
                  onChange={handleFileUpload}
                  type="file"
                  accept="image/*"
                  style={{ backgroundColor: "white", display: "none" }}
                  required
                />
                { !imagePreview ? (
                  <img src={images.noImage} className='h-[150px] w-[150px] mb-2'  alt=""/>
                  
                ) : (
                  <img src={imagePreview} className='h-[150px] w-[150px] mb-2'  alt=""/>
                )}
              <button className='border-[1px] border-solid rounded-[5px] p-1 bg-[#ce3a1d] text-[#fff]' onClick={handlingClickUpload}>
                Chọn hình ảnh
              </button>
            </div>
          </div>
          <div className="flex items-center mb-3">
            <span className="w-[250px]">Tên sản phẩm: </span>
            <input type="text" className=" w-[500px] outline-none h-[40px] border-[1px] border-[#32e9e9] border-solid text-[#0f0303]  text-[17px]  p-[10px] rounded-[5px]  focus:ring-[#9b3bea] focus:border-[#3e3bd5]"    placeholder="Tên sản phẩm" />
          </div>
          <div className="flex items-center mb-3">
            <span className="w-[250px]">File Mp3 </span>
              <input type="file" className=" w-[500px]  outline-none "    placeholder="File audio book" />
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