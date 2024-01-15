import { LinkContainer } from 'react-router-bootstrap';
import { Table, Button, Col } from 'react-bootstrap';
import { FaEdit, FaPlus, FaTrash } from 'react-icons/fa';
import { useParams,useSearchParams } from 'react-router-dom';
import Sidebar from './Sidebar';
import { toast } from 'react-toastify';
import Message from '../../componets/Message';
import Loader from '../../componets/Loader';

import { useGetProductsQuery,useCreateProductMutation,useDeleteProductMutation} from '../../slices/productsApiSlice';
import Paginate from '../../componets/Paginate';
const ProductList = () => {
    const {pageNumber} = useParams()
    const [searchParams] = useSearchParams()
    const pageParam = searchParams.get("pageNumber")||'';
    const { data, isLoading, error, refetch } = useGetProductsQuery({pageNumber: (pageNumber||pageParam)});
    
    const [ createProduct,{isLoading: loadingCreate}] = useCreateProductMutation();
    const [deleteProduct, { isLoading: loadingDelete }] =useDeleteProductMutation();

    const createProductHandler= async ()=> {
        if (window.confirm('Bạn có muốn thêm sản phẩm mới?')) {
            try {
              await createProduct();
              refetch();
            } catch (err) {
              toast.error('Thêm thất bại');
            }
          }
    }
    const deleteHandler = async (id) => {
      if (window.confirm('Bạn có muốn xóa?')) {
        try {
          await deleteProduct(id);
          refetch();
        } catch (err) {
          toast.error(err?.data?.message || err.error);
        }
      }
    }
  return (
    <>
    <div className='row'>
        <div className='col-md-2'>
            <Sidebar />
        </div>
        {isLoading ? (
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
          <Paginate pages={data.pages} page={data.page} isAdmin={true} />
          {/* <TablePagination
              component="div"
              count={data.pages}
              page={data.page}
              onPageChange={handleChangePage}
              rowsPerPage={rowsPerPage}
              onRowsPerPageChange={handleChangeRowsPerPage}
          /> */}
          
          </div>
          </div>
        </>
      )}

    </div>
    </>
  )
}

export default ProductList