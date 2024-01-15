import React, { useEffect } from 'react';
import { Link, useNavigate} from 'react-router-dom';
import { useSelector,useDispatch } from 'react-redux';
import CheckoutSteps from '../componets/CheckoutSteps';
import { useCreateOrderMutation } from '../slices/ordersSlice';
import { clearCartItems } from '../slices/cartSlice';
import Loader from '../componets/Loader';
import { toast } from 'react-toastify';
import { optionCurrency,transform } from '../componets/money';
const PaymentOrder = () => {
  
    const { cartItems, shippingAddress, paymentMethhod,itemsPrice,itemsShip,totalPrice} = useSelector((state) => state.cart)
    
    const [createOrder, {isLoading}] = useCreateOrderMutation()
    const {userInfo} = useSelector((state) =>state.auth)
    const dispatch = useDispatch();
    const navigate = useNavigate();
   
    const totalItem = {

        total: cartItems.reduce((acc,item) =>acc + item.qty *item.bookPrice ,0) || 0,
        ship: ((cartItems.reduce((acc,item) =>acc + item.qty *item.bookPrice ,0))>300000 ? 150000 : 30000) || 0,
        totalcalc: 0,
      }
      totalItem.totalcalc = totalItem.total + totalItem.ship
      useEffect (() => {
        if(!shippingAddress || !paymentMethhod){
            navigate('/shipping')
        }
      }, [shippingAddress,paymentMethhod,navigate]);

      const placeOrderHandler = async () => {
        try {
         
          const res = await createOrder({
            orderItems: cartItems,
            shippingAddress: shippingAddress,
            paymentMethod: paymentMethhod,
            itemsPrice: itemsPrice,
            shippingPrice: itemsShip,
            totalPrice: totalPrice,
          }).unwrap();
          dispatch(clearCartItems());
          navigate(`/order/${res._id}`);
        } catch (error) {
          toast.error(error);
        }
      };
  return (
    <>
        <CheckoutSteps shippingAndPayment confiOrder />
        <div className="row d-flex justify-content-between">
                <div className="col-12 col-lg-8 mt-5 order-confirm">

                    <h4 className="mb-3">ĐỊA CHỈ GIAO HÀNG</h4>
                    <p><b>Tên: </b> {userInfo.name}</p>
                    <p><b>Số điện thoại:</b> {shippingAddress.phone}</p>
                    <p className="mb-4"><b>Địa chỉ:</b>{`${shippingAddress.city}, ${shippingAddress.district}, ${shippingAddress.wards}, ${shippingAddress.address}`} </p>
                    <hr />

                    <h4>PHƯƠNG THỨC THANH TOÁN</h4>
                    <b>Phương thức: </b>
                    {paymentMethhod}
                   
                    <hr />

                    <h4 className="mt-4">ĐƠN HÀNG:</h4>

                    {cartItems.map(item => (
                       <>
                            <hr />
                            <div className="cart-item my-1" key={item._id}>
                                <div className="row">
                                    <div className="col-4 col-lg-2">
                                        <img src={item.bookImage} alt="Laptop" height="45" width="65" />
                                    </div>

                                    <div className="col-5 col-lg-6">
                                        <Link to={`/product/${item._id}`}>{item.bookName}</Link>
                                    </div>


                                    <div className="col-4 col-lg-4 mt-4 mt-lg-0">
                                        <p>{item.qty} x {transform(item.bookPrice,optionCurrency)} = <b>{transform((item.qty * item.bookPrice),optionCurrency)}</b></p>
                                    </div>

                                </div>
                            </div>
                            <hr />
                            </>
                    ))}



                </div>

                <div className="col-12 col-lg-3 my-4">
                              <div id="order_summary">
                                  <h4>Chi tiết đơn hàng</h4>
                                  <hr />
                                  <div className="row">
                                    <div className="col-8">
                                  <p>Thành tiền:  
                                  </p>
                                  </div>
                                  <div className="col-4">
                                  <span>{ transform(totalItem.total,optionCurrency) } </span>
                                  </div>
                                  </div>
                                  <div className="row">
                                    <div className="col-8">
                                  <p>Phí vận chuyển:  
                                  </p>
                                  </div>
                                  <div className="col-4">
                                  <span>{ transform(totalItem.ship,optionCurrency) } </span>
                                  </div>
                                  </div>
                                  <div className="row" style={{ fontWeight: '650'}}>
                                    <div className="col-8">
                                  <p>Tổng số tiền:  
                                  </p>
                                  </div>
                                  <div className="col-4" style={{ fontSize: '20px', color: 'red' }}>
                                  <span>{ transform(totalItem.totalcalc, optionCurrency) } </span>
                                  </div>
                                  </div>
                                  <hr />
                                  <div className="d-flex justify-content-center ">
                                  <button type='button'
                                    className='btn btn-danger w-75'
                                    disabled={cartItems === 0}
                                    onClick={placeOrderHandler} >THANH TOÁN
                                  
                                  </button>

                                  </div>
                                  <div className='d-flex justify-content-center'>
                                  {isLoading && <Loader />}
                                  </div>
                              </div>
                        </div>


            </div>
    </>
  )
}

export default PaymentOrder