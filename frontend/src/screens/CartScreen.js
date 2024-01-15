import { useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import imgicon from '../imageshome/empty-cart1.png'
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import {addToCart, removeFromCart} from '../slices/cartSlice'
import { BsFillTrashFill } from "react-icons/bs";
import { optionCurrency,transform } from "../componets/money";
const CartScreen = () => {
   
    const navigate = useNavigate();

    const dispatch = useDispatch();
    const cart = useSelector ((state) => state.cart)
    const {cartItems} = cart;
    
  const increaseNewQty =  (product,qty,stock) => {
    
      const newQty = qty + 1;
      if (newQty > stock) return;
      qty = newQty;
      dispatch(addToCart({...product,qty}))
    
      
  }

  const decreaseNewQty = (product,qty) => {

      const newQty = qty - 1;
      if (newQty <= 0) return;
      qty = newQty;
      dispatch(addToCart({...product,qty}))
  }
  const removeCartItem = (id) =>{
    dispatch(removeFromCart(id))
  }
  const totalItem = {
    total: cartItems.reduce((acc,item) =>acc + item.qty *item.bookPrice ,0) || 0,
    ship: ((cartItems.reduce((acc,item) =>acc + item.qty *item.bookPrice ,0)) > 300000 ? 150000 : 30000) || 0,
    totalcalc: 0,
  }
  totalItem.totalcalc = totalItem.total+totalItem.ship
  const checkoutHandler = () =>{
    navigate('/login?redirect=/shipping');
  }
  return (
    <>
     <section className='py-5'>
        <div className='container'>
        <div className="titile">
        <h1 className="fs-5">GIỎ HÀNG: <span>({cartItems.length} sản phẩm)</span></h1>
        </div>
        {cartItems.length===0 ?(
          <section className='home-wrapper-2 py-5'>
          <div className='container categories d-flex justify-content-center align-items-center'>
               <div className="text-center">
                    <img src={imgicon} alt='empty cart' />
                    <p>Chưa có sản phẩm trong giỏ hàng của bạn.</p>
                    <Link to = {"/"}>
                    <button type="button" className="btn btn-danger w-75">MUA SẮM NGAY</button>
                    </Link>
               </div>
          </div>
        </section>

        ): (
          <div>
          <section className='home-wrapper-2 py-5'>
            <div className='container categories'>
               <div className="row d-flex justify-content-between">
                      <div className="col-lg-8">
                            {cartItems.map((item) =>(
                              
                              <div className="cart-item py-3" style={{borderBottom: '1px solid'}} key={item._id}>
                              <div className="row">
                              <div className="col-lg-2">
                              <Link to={`/product/${item._id}`}><img src={item.bookImage} alt="bookimg" height="115" width="115" /></Link>
                              </div>

                              <div className="col-5 col-lg-2">
                                  <Link to={`/product/${item._id}`}>
                                    {item.bookName}
                                    </Link>
                              </div>
                              <div className="col-lg-2 mt-4 ">
                                  <p id="card_item_price" style={{color: 'red', fontWeight: 'bold', fontSize: '1.2rem'}}>{transform(item.bookPrice,optionCurrency)}</p>
                              </div>
                              <div className="col-lg-3 mt-4 ">
                                      <div className='input-group w-100' >
                                        <button className="btn btn-outline-secondary px-3 " type="button" onClick={() => decreaseNewQty(item, item.qty)} >
                                            <AiOutlineMinus/>
                                        </button>
                                        <input type="number" className="form-control count input-cart"  value={item.qty} readOnly/>
                                        <button className="btn btn-outline-secondary px-3 " type="button"  onClick={ () =>increaseNewQty(item,item.qty,item.bookQuaranty)}>
                                            <AiOutlinePlus/>
                                        </button>
                                      </div>
                              </div>
                              <div className="col-lg-1 mt-4 px-3">
                                <i onClick={() => removeCartItem(item._id)}> <BsFillTrashFill /> </i>
                              </div>

                              </div>
                              </div>
                            
                            )) }
                      </div>
                      <div className="col-lg-4 my-4">
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
                                  <span>{ transform(totalItem.totalcalc,optionCurrency) } </span>
                                  </div>
                                  </div>
                                  <hr />
                                  <div className="d-flex justify-content-center ">
                                  <button type="button"  onClick={checkoutHandler} className="btn btn-danger w-75" >THANH TOÁN</button>
                                  </div>
                              </div>
                        </div>
               </div>
            </div>
        </section>
          </div>
        ) 
         }
        </div>
    </section>
    </>
  )
}

export default CartScreen