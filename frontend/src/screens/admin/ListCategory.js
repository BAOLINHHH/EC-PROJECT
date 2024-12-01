import React, { useEffect, useState } from "react";
import apiTag from "../../api/apiTag";
import Loader from "../../componets/Loader";
import { FaPlus, FaTrash, FaPen, FaSave } from "react-icons/fa";
import AddCategory from "./AddCategory";
const ListCategory = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [category, setCategory] = useState("");
  const [isOpenAddProductDialog, setIsOpenAddProductDialog] = useState(false);

  useEffect(() => {
    flechData();
  }, []);
  const flechData = async () => {
    try {
      const responsive = await apiTag.getAllCategory();
      setCategory(responsive);
      setIsLoading(false);
    } catch (error) {}
  };
  const handleOpen = () => {
    setIsOpenAddProductDialog(true);
  };
  const handlingCloseAddProductDialog = () => {
    setIsOpenAddProductDialog(false);
  };
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <div className="flex justify-end mb-2">
            <button
              className="flex items-center border-solid border-[1px] rounded-[7px] p-1 bg-[#1c7c3e] text-[15px] gap-x-1 text-end text-[#fff]"
              onClick={handleOpen}
            >
              <FaPlus />
              Thêm hình thức
            </button>
          </div>
          <AddCategory
            isOpen={isOpenAddProductDialog}
            handleClose={handlingCloseAddProductDialog}
          />
          <div className="p-3 overflow-auto h-[310px]">
            <table class="table ">
              <thead className="table-light">
                <tr>
                  <th className="capitalize leading-3 text-[17px]">
                    Hình ảnh{" "}
                  </th>
                  <th className="capitalize leading-3 text-[17px]">Tên</th>
                  <th className="capitalize leading-3 text-[17px]"></th>
                </tr>
              </thead>
              <tbody>
                {category?.map((item) => (
                  <tr>
                    <td className="align-middle">aaaaaa</td>
                    <td className="align-middle">{item.categoryName}</td>
                    <td className="align-middle ">
                      <div className="border-solid border-[1px] rounded-[9px] bg-[#31bcf3] text-[#fff] flex justify-center items-center h-[25px] w-[50px] mb-1 cursor-pointer">
                        <FaPen />
                      </div>
                      <div className="border-solid border-[1px] rounded-[9px] bg-[#dc4f36] text-[#fff] flex justify-center items-center h-[25px] w-[50px] cursor-pointer">
                        <FaTrash />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </>
  );
};

export default ListCategory;