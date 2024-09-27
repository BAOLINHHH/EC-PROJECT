import React, { useEffect } from 'react';
import { Link, useNavigate} from 'react-router-dom';
import { useSelector,useDispatch } from 'react-redux';
import CheckoutSteps from '../componets/CheckoutSteps';
import { useCreateOrderMutation } from '../slices/ordersSlice';
import { clearCartItems } from '../slices/cartSlice';
import Loader from '../componets/Loader';
import { toast } from 'react-toastify';
import { optionCurrency,transform } from '../componets/money';
import logoHome from '../imageshome/home.png'
import logoOffice from '../imageshome/location.png'
import delivery from '../imageshome/truck.png'
import fastDelivery from '../imageshome/fast-delivery.png'
import moneyumg from '../imageshome/iconsmoney-100.png'
import momoimg from '../imageshome/momo_icon.png'
import vnpayimg from '../imageshome/Icon VNPAY-QR.png'
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Radio from '@mui/material/Radio';
import { AiOutlineEnvironment,AiOutlineCar,AiOutlineCreditCard  } from "react-icons/ai";
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
        {/* <div className="row d-flex justify-content-between">
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


        </div> */}
        <section>
          <div className="container-sm">
              <div className="row ">
                  <div className="col-7">
                    <div className="mb-3">
                      <Accordion>
                            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                              <span className= "flex flex-row items-center text-[17px] capitalize leading-[28px] font-black "> < AiOutlineEnvironment style={{ marginRight : "10px"}} />  Dia chi </span>
                            </AccordionSummary>
                              <AccordionDetails>
                                <div className="row flex justify-evenly">
                                  <div className="card col-4 p-4  ">
                                      <div className=" border-[1px] border-solid rounded-[5px] flex flex-row items-center">
                                        <Radio size="small"/>
                                        <span className="pr-2"><img className="w-[19px]" src={logoHome} /></span>
                                        <p className="text-[19px] leading-[28px] capitalize"> Nhà </p>
                                      </div>
                                      <address className="my-2">
                                        <strong className="text-[17px] leading-[28px]"> bao linh</strong>
                                        <p className="text-[17px] leading-[28px]">khu pho</p>
                                        <p className="text-[17px] leading-[28px]">thi tran vam lang</p>
                                        <p className="text-[17px] leading-[28px]">huynh go cong dong</p>
                                        <p className="text-[17px] leading-[28px]">tienh tien giang</p>
                                        <p className="text-[17px] leading-[28px]">03582555222</p>
                                      </address>
                                      <span className="text-danger "  type='button'>Sua</span>
                                  </div>
                                  <div className="card col-4 p-4 ">
                                      <div className=" border-[1px] border-solid rounded-[5px] flex flex-row items-center">
                                        <Radio size="small"/>
                                        <span className="mr-2"><img className="w-[18px]" src={logoOffice} /></span>
                                        <p className="text-[18px] leading-[28px] capitalize"> Văn phòng </p>
                                      </div>
                                      <address className="my-2">
                                        <strong className="text-[17px]  capitalize leading-[28px]"> bao linh</strong>
                                        <p className="text-[17px] leading-[28px]">khu pho</p>
                                        <p className="text-[17px] leading-[28px]">thi tran vam lang</p>
                                        <p className="text-[17px] leading-[28px]">huynh go cong dong</p>
                                        <p className="text-[17px] leading-[28px]">tienh tien giang</p>
                                        <p className="text-[17px] leading-[28px]">03582555222</p>
                                      </address>
                                      <span className='text-danger' type='button'>Sua</span>
                                  </div>
                                </div>
                              </AccordionDetails>
                      </Accordion>
                          </div>
                    <div className="mb-3 ">
                          <Accordion>
                          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                              <span className='flex flex-row items-center text-[17px] capitalize leading-[28px] font-black '> < AiOutlineCar  style={{ marginRight : "10px"}}/>  Dia chi </span>
                            </AccordionSummary>
                            <AccordionDetails>
                            <div className="flex flex-row items-center ">
                            < Radio size="small"/>
                            <span className="mr-2"><img className="w-[18px]" src={delivery}/> </span>
                             <p className="text-[17px] leading-[28px] "> Giao hàng tiêu chuẩn </p> 
                            </div>
                            <div className="flex flex-row items-center">
                              < Radio size="small"/>
                              <span className=" mr-2"><img className="w-[18px]"  src={fastDelivery} /></span> 
                              <p className="text-[17px] leading-[28px]"> Giao hàng cấp tốc </p>
                            </div>
                           
                            </AccordionDetails>
                          </Accordion>
                    </div>
                    
                    <div>
                          <Accordion>
                          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                              <span className='flex flex-row items-center text-[17px] capitalize leading-[28px] font-black '> < AiOutlineCreditCard style={{ marginRight : "10px"}} />  Dia chi </span>
                            </AccordionSummary>
                            <AccordionDetails>
                            <div className="flex flex-row mb-3 ">
                              < Radio size="small"/>
                              <img className="h-[30px] w-[30px] mr-3" src={momoimg}/> 
                              <p className="text-[17px] leading-[28px]">Ví Momo</p>
                            </div>
                            <div className="flex flex-row mb-3">
                            < Radio size="small"/>
                            <img src={vnpayimg} className="h-[30px] w-[35px] mr-3" />
                             <p className="text-[17px] leading-[28px]">Ví VNPAY</p>
                             </div>
                            <div className="flex flex-row mb-3">
                            < Radio size="small"/>
                            <img className="h-[30px] w-[35px] mr-3" src={moneyumg} />
                            <p className="text-[17px] leading-[28px]"> Thanh toán khi nhận hàng</p>
                            </div>
                            </AccordionDetails>
                          </Accordion>
                    </div>
                  </div>
                  <div className=" col-lg-4 shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] bg-[#ffff] border-[1px] border-solid rounded-[16px] p-[2rem]  gx-2">
                    <div className="mb-2">
                      <h4 className="text-[17px] capitalize leading-[28px] font-black">Chi tiết đơn hàng</h4>
                      <hr/>
                    </div>
                    <div className="flex flex-row items-center bg-[#ffffff] border-b-[1px] border-solid border-[#eee] p-[15px] mb-3 ">
                            <div className="basis-[100px]"> 
                                <img src={momoimg} />
                            </div>
                            <div className=" w-[calc(100%-100px)] basis-[calc(100%-100px)] pl-3">
                                <h2 className="font-normal  text-[17px] line-clamp-2 mb-[10px] leading-[28px] text-[#4b5966] capitalize hover:text-[#5caf90] ">aaaaaaaaaa</h2>
                                <h6 className="font-normal text-[#999] text-[14px] mb-[10px] leading-[1.2] capitalize">x1</h6>
                                <span className="text-[#4b5966] text-[14px] font-bold mr-[7px]">20000</span>
                            </div>
                    </div>
                    <div className="row">
                                    <div className="col-8 pb-1">
                                  <p>Thành tiền:  
                                  </p>
                                  </div>
                                  <div className="col-4 pb-1">
                                  <span>{ transform(totalItem.total,optionCurrency) } </span>
                                  </div>
                    </div>
                    <div className="row">
                                    <div className="col-8 pb-1">
                                  <p>Phí vận chuyển:  
                                  </p>
                                  </div>
                                  <div className="col-4 pb-1">
                                  <span>{ transform(totalItem.ship,optionCurrency) } </span>
                                  </div>
                    </div>
                    <div className="row pb-1 font-bold" >
                                    <div className="col-8">
                                  <p>Tổng số tiền:  
                                  </p>
                                  </div>
                                  <div className="col-4 text-[20px] text-[#9d1111]">
                                  <span>{ transform(totalItem.totalcalc,optionCurrency) } </span>
                                  </div>
                    </div>
                    <hr />
                    <div className="d-flex justify-content-center pt-3">
                                  <button type="button" className="btn btn-danger" >THANH TOÁN</button>
                    </div>
                  </div>
              </div>
          </div>
        </section>
    </>
  )
}

export default PaymentOrder