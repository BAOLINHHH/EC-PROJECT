import { useNavigate,useParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { removeFromFavorite } from "../slices/favoriteSlice";
import heartImg from "../imageshome/heartImg.jpg"
import { BsFillTrashFill,BsCart } from "react-icons/bs";
import { useEffect, useState } from "react";
import favoriteApi from "../api/favoriteApi";
import Loader from "../componets/Loader";
import { toast } from "react-toastify";
const FavoriteScreen = () => {

  const dispatch = useDispatch();
  const favorite = useSelector ((state) => state.favorite)
  const {favoriteItems} = favorite;
  const [data,setData] = useState([]);
  const [isLoading,setIsLoading] = useState(true);

    useEffect(() =>{
        flechData();
    },[])

    const handleRemoveFavorite = async(id)=>{
       try {
        await favoriteApi.deleteFavorite(id);
        flechData();
        toast.success(" Xóa sản phẩm yêu thích thành công");
       } catch (error) {
        toast.error(" Xóa sản phẩm yêu thích thất bại");
       }
    }


    const flechData = async() =>{
     try {
      const responseData = await favoriteApi.getAllFavorite();
      setData(responseData.wishlistItems);
      console.log("responseData.wishlistItems",responseData.wishlistItems)
      setIsLoading(false);
     } catch (error) {
      
     }
    }
    // const removefavoriteItem = (id) =>{
    //     dispatch(removeFromFavorite(id))
    //   }
  return (
    <>
    {isLoading ? (
      <Loader />
    ):( 
      <>
      <section className="pt-3">
      <div className="container-sm"> 
            <div className="row mb-8">
                <div className="col-12 text-center">
                <h1 className="leading-3 text-[20px] pt-4 capitalize">Danh sách yêu thích <span>({data.length} sản phẩm)</span></h1>
                </div>
            </div>
            {
              data.length === 0 ?
              (
                <section className="py-5">
                <div className = "container-sm">
                     <div className= "flex flex-col items-center border-[1px] border-solid rounded-[8px] shadow-[0px_0px_2px_rgba(0,0,0,0.1)]">
                      
                          <div className="pt-5 w-[250px] h-[250px]"> 
                            <img className src={heartImg} alt='empty cart' />
                          </div>
                          <div className="text-[#999] text-[14px] my-3">
                            <p>Chưa có sản phẩm trong danh mục yêu thích của bạn.</p>
                          </div>
                          <div className="pb-5">
                          <Link to = {"/"}>
                          <button type="button" className="btn btn-danger w-[150px] ">MUA SẮM NGAY</button>
                          </Link>
                          </div>
                     </div>
                </div>
              </section>
              ) : (
                <>
                <table  class="table">
              <thead className="table-light">
                <tr>
                  <th> </th>
                  <th className="capitalize leading-3 text-[17px]">Sản phẩm</th>
                  <th className="capitalize leading-3 text-[17px]">Giá</th>
                  <th className="capitalize leading-3 text-[17px]">Trạng thái</th>
                  <th className="capitalize leading-3 text-[17px]"></th>
                  
                </tr>
              </thead>
              <tbody>
              { data?.map((item) =>
               <tr>
                <td className="align-middle">
                  <Link to={`/${item.product._id}`}>
                  <img className="h-[80px] w-[80px]" src={item.product.bookImage} />
                  </Link>
                </td>
                <td className="align-middle">
                  <div>
                    <h6 className="font-normal text-[#999] text-[14px] leading-[1.2] capitalize">{item.product.category}</h6>
                    <Link to={`/${item.product._id}`}>
                    <h2 className="font-normal text-[17px] h-[50px] py-3 line-clamp-2  leading-[28px] text-[#4b5966] capitalize">{item.product.bookName}</h2>
                    </Link>
                    <p className="font-normal text-[#999] text-[14px] leading-[1.2] capitalize">{item.product.language}</p>
                  </div> 
                </td>
                <td className="align-middle">{item.product.bookPrice}</td>
                <td className="align-middle">
                  <span class="badge bg-success font-normal text-[14px] leading-[1.2] capitalize"> {item.product.bookQuaranty > 0 ? 'Còn Hàng': 'Hết Hàng' }</span>
                  </td>
                <td className="align-middle">
                  <div className="flex ">
                     {item.product.bookQuaranty >0 ?  ( <button className='bg-[#5caf90]  h-[43px] w-[46px] text-[#ffff] text-[14px] border-[1px]  border-solid rounded-lg transition-all duration-[0.3s] ease-in-out hover:bg-[#4b5966]'
                      type='button'><BsCart style={{marginLeft:'10px'}}  size={'25px'} /></button> ): null}
                    <button className="bg-[#4b5966] ml-[15px] h-[43px] w-[46px] text-[#ffff] text-[14px] border-[1px]  border-solid rounded-lg transition-all duration-[0.3s] ease-in-out hover:bg-[#5caf90]" onClick={() =>handleRemoveFavorite(item.product._id)} ><BsFillTrashFill style={{marginLeft:'10px'}} size={'25px'}/></button>
                  </div>
                </td>
               </tr>               
              ) 
              }
              </tbody>
            </table>
                
                </>
              )
            }

           
      </div>
    </section>
      </>
    )}
    </>
    // <>
    //  {/* <section className='py-5'>
    //     <div className='container'>
    //       <div>
    //       <section className='home-wrapper-2 py-5'>
    //         <div className='container categories'>
    //            <div className="row d-flex justify-content-between">
    //                   <div className="col-12 col-lg-8">
    //                         {favoriteItems.map((item) =>(
                              
    //                           <div className="cart-item py-3" style={{borderBottom: '1px solid'}} key={item._id}>
    //                           <div className="row">
    //                           <div className="col-2">
    //                           <Link to={`/product/${item._id}`}><img src={item.bookImage} alt="bookimg" height="115" width="115" /></Link>
    //                           </div>

    //                           <div className="col-5 ">
    //                               <Link to={`/product/${item._id}`}>
    //                                 {item.bookName}
    //                                 </Link>
    //                           </div>
    //                           <div className="col-2 mt-4 ">
    //                               <p id="card_item_price" style={{color: 'red', fontWeight: 'bold', fontSize: '1.2rem'}}>{item.bookPrice} VND</p>
    //                           </div>
                              
    //                           <div className="col-1 mt-4 px-3">
    //                             <i onClick={() => removefavoriteItem(item._id)}> <BsFillTrashFill /> </i>
    //                           </div>
    //                           <div className="col-2 mt-4 px-3">
    //                           <Rating  value={item.rating} />
    //                           </div>
    //                           </div>
    //                           </div>
                            
    //                         )) }
    //                   </div>
    //            </div>
    //         </div>
    //     </section>
    //       </div>
         
         
    //     </div>
    // </section> */}
    
    // </>
    
  )
  
}

export default FavoriteScreen