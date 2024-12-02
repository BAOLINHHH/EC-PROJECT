import React, { useRef, useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import { MdCancel } from "react-icons/md";
import images from "../../assets/indexImg";
import apiTag from "../../api/apiTag";
export default function EditCategory(props) {
  const inputFileRef = useRef();
  
  const [image, setImage] = useState("");
  const [imagePreview, setImagePreview] = useState("");
  const [categoryPre, setCategoryPre] = useState('');
  const [category, setCategory] = useState('');
  
  // console.log("asdasd", dataName)
  console.log("category", props)
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    setImage(file);
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setImagePreview(reader.result);
      }
    };
    reader.readAsDataURL(file);
  };
  const handlingCloseDialog = () => {
    console.log("props", props)
    props.handleClose();
    setImagePreview("");
  };
  // const handleChangeInput = (e)=>{
  //     setCategory(e.target.value)
  // }
  const handleSave = async(e) => {
    e.preventDefault();

    try {

      if(image){
        const formData = new FormData();
        formData.append("categoryName", category);
        formData.append("image", image);
        
        for (const value of formData.values()) {
          console.log(value);
        }
        // const response = await apiTag.AddCategory(formData);
      }else{
        const postData = { 
          categoryName: category,
          image : props.dataCate.categoryImage
        }
        console.log('postData',postData)

      }
      
    } catch (error) {
      console.error(error);
    }
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
          <span className="text-[20px] text-[#fff]">Chỉnh thể loại</span>
          <div
            className="flex  absolute right-[5px] text-[#fff] cursor-pointer"
            onClick={handlingCloseDialog}
          >
            <MdCancel size={30} />
          </div>
        </DialogTitle>
        <DialogContent>
          <form>
            <div className="mb-3 flex">
              <span className="w-[250px]">Hình ảnh: </span>
              <div className="mt-2">
                <input
                  ref={inputFileRef}
                  onChange={handleFileUpload}
                  type="file"
                  accept="image/*"
                  id="uploadFile"
                  name="uploadFile"
                  style={{ display: "none" }}
                />
                {!imagePreview ? (
                  <img
                    src={props.dataCate.categoryImage}
                    className="h-[150px] w-[150px] mb-2"
                    alt=""
                  />
                ) : (
                  <img
                    src={imagePreview}
                    className="h-[150px] w-[150px] mb-2"
                    alt=""
                  />
                )}
                <label
                  className="border-[1px] border-solid rounded-[5px] p-1 bg-[#ce3a1d] text-[#fff] cursor-pointer"
                  htmlFor="uploadFile"
                >
                  Chọn hình ảnh
                </label>
              </div>
            </div>
            <div className="flex items-center mb-3">
              <span className="w-[250px]">Tên thể loại: </span>
              <input
                type="text"
                value={props.dataCate.categoryName}
                className=" w-[500px] outline-none h-[40px] border-[1px] border-[#32e9e9] border-solid text-[#0f0303]  text-[17px]  p-[10px] rounded-[5px]  focus:ring-[#9b3bea] focus:border-[#3e3bd5]"
                onChange={(e)=>setCategory(e.target.value) }
                placeholder="Tên sản phẩm"
              />
            </div>

            <div className="flex justify-center">
              <button
                className=" border-solid w-[50px] rounded-[7px] bg-[#2d3748] text-[#fff]"
                onClick={handleSave}
              >
                Lưu
              </button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
