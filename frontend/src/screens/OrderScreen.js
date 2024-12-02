import {useEffect} from 'react'
import { Link,useParams } from 'react-router-dom'
import Message from '../componets/Message'
import Loader from '../componets/Loader'
import { PayPalButtons, usePayPalScriptReducer } from '@paypal/react-paypal-js'
import { Row, Col, ListGroup, Image, Card,Button} from 'react-bootstrap';
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { useGetOrderDetailsQuery,usePayOrderMutation,useGetPayPalClientIdQuery,useDeliverOrderMutation} from '../slices/ordersSlice'
const OrderScreen = () => {
    const {id: orderId} = useParams()
    const { data: order,refetch ,isLoading, error} = useGetOrderDetailsQuery(orderId)
    
     const {
      data: paypal,
      isLoading: loadingPayPal,
      error: errorPayPal,
    } = useGetPayPalClientIdQuery();
    
    const [ payOrder, {isLoading: loadingPay}] = usePayOrderMutation()
    const { userInfo } = useSelector((state) => state.auth);
    const [deliverOrder, {isLoading: loadingDeliver}]= useDeliverOrderMutation();
    const [{ isPending }, paypalDispatch] = usePayPalScriptReducer();
    
    useEffect(() => {
      if (!errorPayPal && !loadingPayPal && paypal.clientId) {
        const loadPaypalScript = async () => {
          paypalDispatch({
            type: 'resetOptions',
            value: {
              'client-id': paypal.clientId,
              currency: 'USD',
            },
          });
          paypalDispatch({ type: 'setLoadingStatus', value: 'pending' });
        };
        if (order && !order.isPaid) {
          if (!window.paypal) {
            loadPaypalScript();
          }
        }
      }
    }, [order, paypal, paypalDispatch, loadingPayPal, errorPayPal]);
    function onApprove(data, actions){
      return actions.order.capture().then(async function(details){
        try{
            await payOrder({orderId,details});
            refetch();
            toast.success('Thanh toán thành công')
        }catch (err){
            toast.error('Thanh toán thất bại')
        }
      })
    }
  
    function onError(){
      toast.error('Thanh toán thất bại')
    }
    function createOrder(data, actions) {
      return actions.order
        .create({
          purchase_units: [
            {
              amount: { value: order.totalPrice },
            },
          ],
        })
        .then((orderID) => {
          return orderID;
        });
    }
    const deliverHandler = async () => {
      try{
      await deliverOrder(orderId);
      refetch();
      toast.success('Cập nhật vận chuyển thành công')
    } catch(err)
    {
      toast.error(err?.data?.message || err.message)
    }

    };

    return (
    //   <Loader />
  
    // ) : error ? (
    //   <Message variant='danger'>{error}</Message>
    // ) : (
      <>
      <section>
        <div className="container-sm">
              <div>
                <h1 className="text-[23px] text-[#1a0505] font-[800] capitalize pb-2">Thông tin chi tiết</h1>
                <h4 className="text-[18px]  font-normal capitalize">Cảm ơn đã mua hàng</h4>
              </div>
              <div>
              <ListGroup variant='flush'>
           <ListGroup.Item>
              <div className='flex gap-x-16'>
                  <div className="border-solid border-[2px] rounded-[6px] px-[20px] py-[10px]  shadow-[1px_1px_7px_rgba(#00000029)]">
                    <div className="mb-[15px] ">
                      <h3 className="tetx-[19px] font-[700]">  Thông Tin  đơn hằng</h3>
                    </div>
                      <div className="mb-[5px]">
                        <p><strong>Mã đơn hàng: </strong>1111</p>
                      </div>
                      <div className="flex gap-x-[30px] mb-[5px]">
                        <div>
                          <strong className='tet-[17px]'>Ngày đặt</strong>
                          <p className="text-[17px]">23/12/2022</p>
                        </div>
                        <div>
                          <strong className="text-[17px]">Ngày hoàn thành</strong>
                          <p className="text-[17px]">23/12/2022</p>
                        </div>
                      </div>

                      <div className="mb-[5px]"> 
                        <strong className="text-[17px]">Trạng thái đơn hàng</strong>
                        <p className="text-[17px]">Mới đặt</p>
                      </div>
                      <div className="mb-[5px]"> 
                        <strong className="text-[17px]">Phương thức thanh toán</strong>
                        <p className="text-[17px]">Thanh toán khi nhập hàng</p>
                      </div>
                  </div>
                  <div className="border-solid border-[2px] rounded-[6px] w-[340px] px-[20px] py-[10px] shadow-[1px_1px_7px_rgba(#00000029)]">
                    <div className="mb-[15px]">
                      <h3 className="tetx-[19px] font-[700]">Thông tin người nhận</h3>
                    </div>
                    <div>
                        <p>Doan bao Linh</p>
                        <p>0328297844</p>
                        <p>khu pho 1, thiu tawrawrawr, adadasdas,asdasdasdas ,asdasdasdasda</p>
                    </div>
                  </div>
                  <div className="border-solid border-[2px] rounded-[6px] w-[340px] px-[20px] py-[10px] shadow-[1px_1px_7px_rgba(#00000029)]">
                    <div className="mb-[15px]">
                      <h3 className="tetx-[19px] font-[700]">Tổng tiền đơn hàng</h3>
                    </div>
                    <div>
                    <div className="mb-[5px]">
                      <Row>
                      <Col>Thành tiền</Col>
                     <Col>132123 VND</Col>
                    </Row>
                    </div>
                    <div className="mb-[5px]">
                      <Row>
                        <Col>Phí vận chuyển</Col>
                        <Col>1231231 VND</Col>
                      </Row>
                    </div>
                    <div className="mb-[5px]">
                      <Row>
                        <Col>Tổng Số Tiền</Col>
                        <Col>1111111 VND</Col>
                      </Row>
                    </div>
              {/* {!order.isPaid && (
                <ListGroup.Item>
                  {loadingPay && <Loader />}

                  {isPending ? (
                    <Loader />
                  ) : (
                    <div>
                      <div>
                     
                        <PayPalButtons
                          createOrder={createOrder}
                          onApprove={onApprove}
                          onError={onError}
                        ></PayPalButtons>
                       
                      </div>
                    </div>
                  )}
                </ListGroup.Item>
              )}

                  {loadingDeliver && <Loader />}

                  {userInfo &&
                    userInfo.isAdmin &&
                    order.isPaid &&
                    !order.isDelivered && (
                      <ListGroup.Item>
                        <Button
                          type='button'
                          className='btn btn-block'
                          onClick={deliverHandler}
                        >
                          Cập nhật trạng thái vận chuyển
                        </Button>
                      </ListGroup.Item>
                    )} */}

                    </div>
                  </div>
              </div>
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Đơn Hàng</h2>
              {/* {order.orderItems.length === 0 ? (
                <Message>Order is empty</Message>
              ) : ( */}
                <ListGroup variant='flush'>
                  {/* {order.orderItems.map((item, index) => ( */}
                    {/* <ListGroup.Item key={index}> */}
                    <ListGroup.Item >
                      <Row>
                        <Col md={1}>
                          <Image
                            // src={item.bookImage}
                            // alt={item.bookName}
                            // fluid
                            // rounded
                          />
                        </Col>
                        <Col>
                          {/* <Link to={`/product/${item.product}`}>
                            {item.bookName}
                          </Link> */}
                        </Col>
                        <Col md={4}>
                          {/* {item.qty} x {item.bookPrice} VND = {item.qty * item.bookPrice} VND */}
                          2 x 5 VND = 1122121 VND
                        </Col>
                      </Row>
                    </ListGroup.Item>
                   {/* ))} */}
                </ListGroup>
              {/* )} */}
            </ListGroup.Item>
          </ListGroup>
              </div>
        </div>
      </section>
      {/* <Row>
        <Col md={8}>
        <h1 className="text-[23px] text-[#1a0505] font-[800] capitalize pb-2">Thông tin chi tiết</h1>
        <h4 className="text-[18px]  font-normal capitalize">Cảm ơn đã mua hàng</h4>
          <ListGroup variant='flush'>
        
            <ListGroup.Item>
              <h2> THÔNG TIN </h2>
              <p>
                <strong>Mã đơn hàng: </strong>{order._id}
              </p>
              <p>
                <strong>Tên: </strong>{order.user.name}
              </p>
              <p>
                <strong>Số điện thoại: </strong>{order.shippingAddress.phone}
              </p>
              <p>
                <strong>Email: </strong>{' '}
                <a href={`mailto:${order.user.email}`}>{order.user.email}</a>
              </p>
              <p>
                <strong>Địa chỉ: </strong>
                {order.shippingAddress.city}, {order.shippingAddress.district}, {order.shippingAddress.wards}, {order.shippingAddress.address} 
              </p>
              {order.isDelivered ? (
                <Message variant='success'>
                  Đã được vận chuyển vào {order.deliveredAt}
                </Message>
              ) : (
                <Message variant='danger'>Chưa vận chuyển</Message>
              )}
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>PHƯƠNG THỨC THANH TOÁN</h2>
              <p>
                <strong>Phương thức: </strong>
                {order.paymentMethod}
              </p>
              {order.isPaid ? (
                <Message variant='success'>Đã thanh toán vào {order.paidAt}</Message>
              ) : (
                <Message variant='danger'>Chưa thanh toán</Message>
              )}
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Đơn Hàng</h2>
              {order.orderItems.length === 0 ? (
                <Message>Order is empty</Message>
              ) : (
                <ListGroup variant='flush'>
                  {order.orderItems.map((item, index) => (
                    <ListGroup.Item key={index}>
                      <Row>
                        <Col md={1}>
                          <Image
                            src={item.bookImage}
                            alt={item.bookName}
                            fluid
                            rounded
                          />
                        </Col>
                        <Col>
                          <Link to={`/product/${item.product}`}>
                            {item.bookName}
                          </Link>
                        </Col>
                        <Col md={4}>
                          {item.qty} x {item.bookPrice} VND = {item.qty * item.bookPrice} VND
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card>
          <ListGroup variant='flush'>
          <ListGroup.Item>
                <h2>Chi Tiết Đơn Hàng</h2>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Thành tiền</Col>
                  <Col>{order.itemsPrice} VND</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Phí vận chuyển</Col>
                  <Col>{order.shippingPrice} VND</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Tổng Số Tiền</Col>
                  <Col>{order.totalPrice} VND</Col>
                </Row>
              </ListGroup.Item>
              {!order.isPaid && (
                <ListGroup.Item>
                  {loadingPay && <Loader />}

                  {isPending ? (
                    <Loader />
                  ) : (
                    <div>
                      <div>
                     
                        <PayPalButtons
                          createOrder={createOrder}
                          onApprove={onApprove}
                          onError={onError}
                        ></PayPalButtons>
                       
                      </div>
                    </div>
                  )}
                </ListGroup.Item>
              )}

                  {loadingDeliver && <Loader />}

                  {userInfo &&
                    userInfo.isAdmin &&
                    order.isPaid &&
                    !order.isDelivered && (
                      <ListGroup.Item>
                        <Button
                          type='button'
                          className='btn btn-block'
                          onClick={deliverHandler}
                        >
                          Cập nhật trạng thái vận chuyển
                        </Button>
                      </ListGroup.Item>
                    )}

          </ListGroup>
          </Card>
        </Col>
      </Row> */}
      </>
    )
}

export default OrderScreen