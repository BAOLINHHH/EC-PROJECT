import { LinkContainer } from 'react-router-bootstrap';
import { Table, Button, Col } from 'react-bootstrap';
import { FaEdit, FaPlus, FaTrash ,FaEye,FaPen } from 'react-icons/fa';
import { Link, useParams,useSearchParams } from 'react-router-dom';
import SidebarAdmin from './SidebarAdmin';
import { toast } from 'react-toastify';
import Message from '../../componets/Message';
import Loader from '../../componets/Loader';
import { useGetProductsQuery,useCreateProductMutation,useDeleteProductMutation} from '../../slices/productsApiSlice';
// import Paginate from '../../componets/Paginate';
import AddProduct from './AddProduct';
import { useState } from 'react';
import listProduct from '../../api/productsAPI';
import { useEffect } from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { optionCurrency,transform } from "../../componets/money"
import formatCurrency from "../../utils/format"
import dayjs from "dayjs";
const ProductList = () => {
    // const {pageNumber} = useParams()
    const [searchParams] = useSearchParams()
    const [dataProduct, setDataProduct] = useState('');
    const [isLoading,SetIsLoading] = useState(true);
    const [pageNumber, setPageNumber] = useState('');
    // const pageParam = searchParams.get("pageNumber")||'';
    // const { data,  error, refetch } = useGetProductsQuery({pageNumber: (pageNumber||pageParam)});
    useEffect(()=>{
      flechData()
    },[pageNumber])
    
    const flechData = async()=>{
      try {
        const response = await listProduct.getAllAdminProduct(pageNumber);
        setDataProduct(response);
        SetIsLoading(false);
      } catch (error) {
        toast.error(error?.response.data.message)
      }
    }
    const [ createProduct,{isLoading: loadingCreate}] = useCreateProductMutation();
    const [deleteProduct, { isLoading: loadingDelete }] =useDeleteProductMutation();
    
    const [isOpenAddProductDialog, setIsOpenAddProductDialog] = useState(false)

    // const createProductHandler= async ()=> {
    //     if (window.confirm('Bạn có muốn thêm sản phẩm mới?')) {
    //         try {
    //           await createProduct();
    //           refetch();
    //         } catch (err) {
    //           toast.error('Thêm thất bại');
    //         }
    //       }
    // }
    const handleOpen=()=>{
      setIsOpenAddProductDialog(true);
    };
    const handlingCloseAddProductDialog = () => {
      setIsOpenAddProductDialog(false);
    };
    const handlePaginate = (event,value) =>{
      const currentPage = value ; 
        setPageNumber(currentPage)
    }
    // const deleteHandler = async (id) => {
    //   if (window.confirm('Bạn có muốn xóa?')) {
    //     try {
    //       await deleteProduct(id);
    //       refetch();
    //     } catch (err) {
    //       toast.error(err?.data?.message || err.error);
    //     }
    //   }
    // }
  return (
    <>
      
      
      
        <div className='row'>
            <div className='col-md-2'>
                <SidebarAdmin />
            </div>
            {isLoading ? ( <Loader/>): (<> 
            <div className='col-md-10'>
              <div className="mb-5">
                <h1 className=" text-[20px] font-[700] mb-2">THÔNG TIN SẢN PHẨM</h1>
                <div className="flex justify-end">
                  <button className="flex items-center border-solid border-[1px] rounded-[7px] p-1 bg-[#1c7c3e] text-[15px] gap-x-1 text-end text-[#fff]" onClick={handleOpen}>
                  <FaPlus />
                  Thêm sản phẩm
                  </button>
                </div>
                <AddProduct
                isOpen = {isOpenAddProductDialog}
                handleClose={handlingCloseAddProductDialog}
                />
              </div>
              <table  class="table  border-[1px] border-solid">
                    <thead className="table-light">
                    <tr>  
                      <th className="capitalize leading-3 text-[17px]">Hình ảnh sản phẩm</th>
                      <th className="capitalize leading-3 text-[17px]">Tên sản Phẩm</th>
                      <th className="capitalize leading-3 text-[17px]">Thể loại</th>
                      <th className="capitalize leading-3 text-[17px]">Trạng thái</th>
                      <th className="capitalize leading-3 text-[17px]">Giá sản phẩm </th>
                      <th className="capitalize leading-3 text-[17px]">Ngày tạo</th>
                      <th className=""></th>
                    </tr>
                  </thead>
                  <tbody>
                  {dataProduct && dataProduct?.products?.map((item)=>(
                     <tr>
                      
                     <td className="align-middle">
                         doan bao linh
                     </td>
                     <td className="align-middle  ">
                        <p className='w-[330px] line-clamp-1 text-[17px] text-[#100707]'>{item.bookName}</p> 
                     </td>
                     <td className="align-middle">
                        <p className='text-[17px] text-[#100707]'>{item.category.categoryName} </p>
                     </td>
                     <td className="align-middle">
                     {item.bookQuaranty > 0 ? (
                        <span className='bg-[#a6e157] text-[#fff] border-solid border-[1px] rounded-[8px] p-1'>
                          Còn hàng
                        </span>
                        ):(<>
                        <span className='bg-[#e62f2f] text-[#fff] border-solid border-[1px] rounded-[8px] p-1'>
                          Hết hàng
                        </span>
                        </>)}
                     </td>
                     <td className="align-middle">
                          <p className='text-[#c53533] text-[17px]'> { transform(item.bookPrice,optionCurrency)}</p>  
                     </td>
                     <td className="align-middle">
                     {dayjs(item.createdAt).format("DD/MM/YYYY")}
                     </td>
                     
                     <td className="align-middle">
                       <Link to={`detailproduct/${item._id}`}>
                       <div className="cursor-pointer border-solid border-[1px] rounded-[9px] bg-[#8e8584] text-[#fff] flex justify-center items-center h-[25px] w-[50px] mb-1">
                       <FaEye/>
                       </div>
                       </Link>
                       <div className="border-solid border-[1px] rounded-[9px] bg-[#31bcf3] text-[#fff] flex justify-center items-center h-[25px] w-[50px] mb-1">
                       <FaPen/>
                       </div>
                       <div className="border-solid border-[1px] rounded-[9px] bg-[#dc4f36] text-[#fff] flex justify-center items-center h-[25px] w-[50px]">
                         <FaTrash/>
                       </div>
                     </td>
                   </tr>  
                  ))}             
                  </tbody>
              </table>
                <div className='flex justify-center mt-3'>
                  <Stack spacing={2}>
                      <Pagination count={dataProduct.pages} onChange={handlePaginate}/>
                  </Stack>
                </div>
            </div>
            </>) } 
            {/* {isLoading ? (
            <Loader />
          ) : error ? (
            <Message variant='danger'>{error}</Message>
          ) : (
            <>
            <div className='col-md-10'>
              <h2 className='text-center'>THÔNG TIN CÁC SẢN PHẨM</h2>
                <Col className='text-end'>
                <Button className='my-3'onClick={createProductHandler} >
                    <FaPlus />Thêm sản phẩm
                </Button>
                </Col>
                {loadingCreate && <Loader />}
                {loadingDelete && <Loader />}
              <Table striped bordered hover responsive className='table-sm'>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Tên sản phẩm</th>
                    <th>Giá tiền</th>
                    <th>Số lượng tồn kho</th>
                    <th>Thể loại</th>
                    <th>Nhà xuất bản</th>
                    <th>Tên tác giả</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {data.products.map((product) => (
                    <tr key={product._id}>
                      <td>{product._id}</td>
                      <td >{product.bookName}</td>
                      <td>{product.bookPrice} VND</td>
                      <td>{product.bookQuaranty}</td>
                      <td>{product.category}</td>
                      <td>{product.publicCompany}</td>
                      <td>{product.author}</td>
                      <td>
                        <div className=' row row-cols-lg-2 '>
                          <div className='col'>
                        <LinkContainer to={`/admin/product/${product._id}/edit`}>
                          <Button variant='light' className='btn-sm mx-2'>
                            <FaEdit />
                          </Button>
                        </LinkContainer>
                        </div>
                        <div className='col'>
                        <Button
                            
                          variant='danger'
                          className='btn-sm'
                          onClick={() => deleteHandler(product._id)}
                        >
                          <FaTrash style={{ color: 'white' }} />
                        </Button>
                        </div>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
              <div className="d-flex justify-content-center mt-3">
              <Paginate pages={data.pages} page={data.page} isAdmin={true} /> */}
              {/* <TablePagination
                  component="div"
                  count={data.pages}
                  page={data.page}
                  onPageChange={handleChangePage}
                  rowsPerPage={rowsPerPage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
              /> */}
              
              {/* </div>
              </div>
            </>
          )} */}

        </div>
      
      
    
        
    </>
  )
}

export default ProductList