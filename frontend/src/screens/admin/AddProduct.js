import React, { useRef, useState } from 'react'
import Dialog from "@mui/material/Dialog";
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import { MdCancel } from "react-icons/md";
import images from '../../assets/indexImg'
import apiTag from '../../api/apiTag';
import { useEffect } from 'react';

export default function AddProduct(props){
  const inputFileRef = useRef();
  const [image, setImage] = useState("");
  const [audio,setAudio] = useState('');
  const [pdf,setPdf] = useState('')
  const [imagePreview,setImagePreview] = useState('');
  const [selectCategory , setSelectCategory] = useState("");
  const [category, setCategory] = useState('');
  const [publicCompany, setPublicCompany] = useState('');
  const [selectPublicCompany , setSelectPublicCompany] = useState("");
  const [form, setForm]= useState('');
  const [selectForm , setSelectForm] = useState("");
  const [language, setLanguage]= useState('');
  const [selectLanguage , setSelectLanguage] = useState("");
  // const handlingClickUpload =()=>{
  //   inputFileRef.current.click();
  // }
  useEffect (() =>{
      flechData()
  },[])
  const flechData = async ()=>{
    try {
      const responseCategory = await apiTag.getAllCategory();
      const responsePublicCompany = await apiTag.getAllPublicCompany();
      const responseForm = await apiTag.getAllForm();
      const responseLanguage = await apiTag.getAllLanguage();
      setCategory(responseCategory);
      setPublicCompany(responsePublicCompany);
      setForm(responseForm);
      setLanguage(responseLanguage);
    } catch (error) {
    }
  }

  const handleFileUpload =(e)=>{
    const file =  e.target.files[0];
    setImage(file)
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
          setImagePreview(reader.result);
      }
  }; reader.readAsDataURL(file);
  }
  const handleFileAudioUpload = (e)=>{
    const file =  e.target.files[0];
    setAudio(file)
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
      }
  }; reader.readAsDataURL(file);
  };
  const handleFilePdfUpload = (e)=>{
    const file = e.target.files[0];
    setPdf(file)
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
      }
  }; reader.readAsDataURL(file);
  };
  const handleSave=(e)=>{
    e.preventDefault();
    if (!image || !audio || !pdf ) {
      alert("Vui lòng chọn một hình ảnh!");
      return;
    };

    const formData = new FormData();
      formData.append("image", image);
      formData.append("audio", audio);
      formData.append("pdf", pdf);

      for (const value of formData.values()) {
        console.log(value);
      }
  }

  const handleCategoryChange =(e)=>{
      const categoryId = e.target.value;
      setSelectCategory(categoryId);

  }
  const handlePublicCompanyChange = (e)=>{
    const publicCompanyId = e.target.value;
    setSelectPublicCompany(publicCompanyId)
  };
  const handleFormChange = (e)=>{
    const formId = e.target.value;
    setSelectForm(formId);
  };
  const handleLanguageChange = (e)=>{
    const languageId = e.target.value;
    setSelectLanguage(languageId)
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
          <form>
          <div className='mb-3 flex'>
            <span className='w-[250px]'>Hình ảnh: </span>
            <div className='mt-2'>
            <input
                  ref={inputFileRef}
                  onChange={handleFileUpload}
                  type="file"
                  accept="image/*"
                  id="uploadFile"
                  name="uploadFile"
                  style={{ display: "none" }}
                />
                { !imagePreview ? (
                  <img src={images.noImage} className='h-[150px] w-[150px] mb-2'  alt=""/>
                  
                ) : (
                  <img src={imagePreview} className='h-[150px] w-[150px] mb-2'  alt=""/>
                )}
              <span className='border-[1px] border-solid rounded-[5px] p-1 bg-[#ce3a1d] text-[#fff] cursor-pointer'  
              htmlFor="uploadFile" >
                Chọn hình ảnh
              </span>
            </div>
          </div>
          <div className="flex items-center mb-3">
            <span className="w-[250px]">Tên sản phẩm: </span>
            <input type="text" className=" w-[500px] outline-none h-[40px] border-[1px] border-[#32e9e9] border-solid text-[#0f0303]  text-[17px]  p-[10px] rounded-[5px]  focus:ring-[#9b3bea] focus:border-[#3e3bd5]"    placeholder="Tên sản phẩm" />
          </div>
          <div className="flex items-center mb-3">
            <span className="w-[250px]">File Mp3 </span>
              <input type="file" className=" w-[500px]   outline-none " accept=".mp3" onChange={handleFileAudioUpload} placeholder="File audio book" />
          </div>
          <div className="flex items-center mb-3">
            <span className="w-[250px]">File PDF </span>
              <input type="file" className=" w-[500px]  outline-none " accept='application/pdf' onChange={handleFilePdfUpload} placeholder="File PDF book" />
          </div>
          <div className="flex items-center mb-3">
            <span className="w-[250px]">Thể loại </span>
            {/* <input type="text" className=" w-[500px] outline-none h-[30px] border-[1px] border-[#32e9e9] border-solid text-[#0f0303]  text-[17px]  p-[10px] rounded-[5px]  focus:ring-[#9b3bea] focus:border-[#3e3bd5]"    placeholder="Tên sản phẩm" /> */}
            <select value={selectCategory} onChange={handleCategoryChange}  className="outline-none h-[45px] border-[1px] border-[#32e9e9] border-solid text-[#0f0303]  text-[17px] w-[500px] p-[9px] rounded-[5px]  focus:ring-[#9b3bea] focus:border-[#3e3bd5]">
                                    <option value="">-- Chọn Thể loại --</option>
                                        { category && category?.map((item)=>(
                                              <option
                                              key={item._id}
                                              value={item._id}
                                              selected="selected"
                                              // disabled={!handleProvinceChange}
                                            >
                                              {item.categoryName}
                                            </option>
                                       ))}
            </select>
          </div>
          <div className="flex items-center mb-3">
            <span className="w-[250px]">Nhà xuất bản </span>
            {/* <input type="text" className=" w-[500px] outline-none h-[30px] border-[1px] border-[#32e9e9] border-solid text-[#0f0303]  text-[17px]  p-[10px] rounded-[5px]  focus:ring-[#9b3bea] focus:border-[#3e3bd5]"    placeholder="Tên sản phẩm" /> */}
            <select   value={selectPublicCompany} onChange={handlePublicCompanyChange}  className="outline-none h-[45px] border-[1px] border-[#32e9e9] border-solid text-[#0f0303]  text-[17px] w-[500px] p-[9px] rounded-[5px]  focus:ring-[#9b3bea] focus:border-[#3e3bd5]">
                                    <option value="">-- Chọn Nhà xuất bản --</option>
                                        { publicCompany && publicCompany?.map((item)=>(
                                              <option
                                              key={item._id}
                                              value={item._id}
                                              selected="selected"
                                              // disabled={!handleProvinceChange}
                                            >
                                              {item.publicCompanyName}
                                            </option>
                                       ))}
            </select>
          </div>
          <div className="flex items-center mb-3">
            <span className="w-[250px]">Hình thức sách</span>
            {/* <input type="text" className=" w-[500px] outline-none h-[30px] border-[1px] border-[#32e9e9] border-solid text-[#0f0303]  text-[17px]  p-[10px] rounded-[5px]  focus:ring-[#9b3bea] focus:border-[#3e3bd5]"    placeholder="Tên sản phẩm" /> */}
            <select   value={selectForm} onChange={handleFormChange}  className="outline-none h-[45px] border-[1px] border-[#32e9e9] border-solid text-[#0f0303]  text-[17px] w-[500px] p-[9px] rounded-[5px]  focus:ring-[#9b3bea] focus:border-[#3e3bd5]">
                                    <option value="">-- Chọn Hình thức sách --</option>
                                        { form && form?.map((item)=>(
                                              <option
                                              key={item._id}
                                              value={item._id}
                                              selected="selected"
                                              // disabled={!handleProvinceChange}
                                            >
                                              {item.form}
                                            </option>
                                       ))}
            </select>
          </div>
          <div className="flex items-center mb-3">
            <span className="w-[250px]">Ngôn ngữ</span>
            {/* <input type="text" className=" w-[500px] outline-none h-[30px] border-[1px] border-[#32e9e9] border-solid text-[#0f0303]  text-[17px]  p-[10px] rounded-[5px]  focus:ring-[#9b3bea] focus:border-[#3e3bd5]"    placeholder="Tên sản phẩm" /> */}
            <select   value={selectLanguage} onChange={handleLanguageChange}  className="outline-none h-[45px] border-[1px] border-[#32e9e9] border-solid text-[#0f0303]  text-[17px] w-[500px] p-[9px] rounded-[5px]  focus:ring-[#9b3bea] focus:border-[#3e3bd5]">
                                    <option value="">-- Chọn Hình thức sách --</option>
                                        { language && language?.map((item)=>(
                                              <option
                                              key={item._id}
                                              value={item._id}
                                              selected="selected"
                                              // disabled={!handleProvinceChange}
                                            >
                                              {item.languageName}
                                            </option>
                                       ))}
            </select>
          </div>
          <div className="flex items-center mb-3">
            <span className="w-[250px]">Giá sản phẩm: </span>
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
            <button className=' border-solid w-[50px] rounded-[7px] bg-[#2d3748] text-[#fff]' onClick={handleSave}>
              Lưu
            </button>
          </div>
          </form>
        </DialogContent>
      </Dialog>
    </>
  )
}