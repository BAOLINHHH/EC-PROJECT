import React, { useEffect, useState } from "react";
import { useGetMyOrderQuery } from "../slices/ordersSlice";
import { Table, Button } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import Message from "../componets/Message";
import Loader from "../componets/Loader";
import { FaTimes } from "react-icons/fa";
import { FaRegEye } from "react-icons/fa";
import SidebarUser from "./SidebarUser";
import orderApi from "../api/orderApi";
const ListOrderScreen = () => {
  // const {data: orders ,isLoading, error }= useGetMyOrderQuery();

  const [orders, setOrders] = useState();
  const handleGetMyOrders = async () => {
    const response = await orderApi.getMyOrders();
    console.log("orders", response);
    setOrders(response.orders);
  };
  useEffect(() => {
    handleGetMyOrders();
  }, []);

  return (
    <section>
      <div className="container">
        <div className=" flex gap-[60px] ">
          <div className="w-[280px] shadow-[1px_1px_7px_rgba(#00000029)]">
            <SidebarUser />
          </div>
          <div className=" border-solid border-[1px] rounded-[6px] w-full bg-[#fff] p-[20px] shadow-[1px_1px_7px_rgba(#00000029)]">
            <div className="w-full py-4">
              <h1 className="font-[600] text-[20px] p-[10px]">
                Đơn hàng của tôi
              </h1>
            </div>
            <table class="table">
              <thead className="table-light">
                <tr>
                  <th className="capitalize leading-3 text-[17px]">ID</th>
                  <th className="capitalize leading-3 text-[17px]">Ngày đặt</th>
                  <th className="capitalize leading-3 text-[17px]">
                    Trạng thái{" "}
                  </th>
                  <th className="capitalize leading-3 text-[17px]">
                    Tổng tiền
                  </th>
                  <th className="capitalize leading-3 text-[17px]"></th>
                </tr>
              </thead>
              <tbody>
                {orders?.map((order) => (
                  <tr>
                    <td className="align-middle">{order._id}</td>
                    <td className="align-middle">
                      <td>{order.orderItems.createdAt}</td>
                    </td>
                    <td className="align-middle">
                        <p>{order.orderItems.orderStatus}</p>
                    </td>
                    <td className="align-middle">{order.itemsPrice}</td>
                    <td className="align-middle">
                      <LinkContainer to={`/order/${order._id}`}>
                        <Button>
                          <FaRegEye />
                        </Button>
                      </LinkContainer>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>

    // <section>
    // <div className="container">
    //     <div className="row d-flex justify-content-center align-items-center h-100">
    //     <div className="col-md-12">
    //         <div className="card text-black" style={{borderRadius: '25px'}}>
    //         <div className="card-body p-md-5">
    //             <div className="row justify-content-center">
    //             <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">THÔNG TIN ĐƠN HÀNG</p>
    //             {isLoading ? (
    //       <Loader />
    //     ) : error ? (
    //       <Message variant='danger'>
    //         {error?.data?.message || error.error}
    //       </Message>
    //     ) : (
    //       <Table striped hover responsive className='table-sm'>
    //         <thead>
    //           <tr>
    //             <th>ID</th>
    //             <th>Số lượng</th>
    //             <th>Tổng tiền</th>
    //             <th>Trạng thái thanh toán</th>
    //             <th>Trạng thái vận chuyển</th>
    //             <th></th>
    //           </tr>
    //         </thead>
    //         <tbody>
    //           {orders.map((order) => (
    //             <tr key={order._id}>
    //               <td>{order._id}</td>
    //               <td>{order.orderItems.length}</td>
    //               <td>{order.totalPrice}</td>
    //               <td>
    //                 {order.isPaid ? (
    //                   <p> Đã thanh toán vào {order.paidAt.substring(0, 10)}</p>
    //                 ) : (
    //                   <FaTimes style={{ color: 'red' }} />
    //                 )}
    //               </td>
    //               <td>
    //                 {order.isDelivered ? (
    //                  <p> Đã vận chuyển vào {order.deliveredAt.substring(0, 10)} </p>
    //                 ) : (
    //                   <FaTimes style={{ color: 'red' }} />
    //                 )}
    //               </td>
    //               <td>
    //                 <LinkContainer to
    //                 ={`/order/${order._id}`}>
    //                   <Button className='btn-sm' variant='light'>
    //                     Chi tiết
    //                   </Button>
    //                 </LinkContainer>
    //               </td>
    //             </tr>
    //           ))}
    //         </tbody>
    //         </Table>
    //         )}
    //         </div>
    //         </div>
    //         </div>
    //     </div>
    //     </div>
    // </div>
    // </section>
  );
};

export default ListOrderScreen;
