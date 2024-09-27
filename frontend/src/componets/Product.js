
import { Link } from "react-router-dom"
import Rating from '@mui/material/Rating';
import {BsCart ,BsSuitHeart,BsEye  } from 'react-icons/bs';
import { optionCurrency,transform } from "./money"
const Product = ({product}) => {
  return (
    // <Card className="  my-3 p-3 rounded">
    //     <Link to={ `/product/${product._id}`}>
    //         <Card.Img src={product.bookImage} variant="top" />
    //     </Link>
    //     <Card.Body>
    //         <Link to={ `/product/${product._id}`}>
    //             <Card.Title as='div' className="product-title">
    //                 <strong>{product.bookName} </strong>
    //             </Card.Title>
    //         </Link>
    //         <Card.Text as='h3'>
    //             {transform(product.bookPrice,optionCurrency)}
    //         </Card.Text>
    //         <Card.Text as='div'>
    //                 <Rating value={product.rating} text={`(${product.bookQuaranty})`} />
    //         </Card.Text>
    //     </Card.Body>
    // </Card>
    <>       
            <div className="w-[31.6%]">
                <div className=" card h-[430px]  group ">
                    <div className="flex justify-center">
                        <Link to={ `/product/${product._id}`}>
                        <img className="max-h-[210px] w-[210px]" src={product.bookImage}/>
                        </Link>
                    </div>
                    <div className="flex flex-row justify-center opacity-0 group-hover:!opacity-[1]  transition-all ease-in-out duration-[0.3s] group-hover:-translate-y-1  items-center">
                            <button className=" mx-2 h-[30px] w-[30px] bg-[#fff] border-[1px] border-solid rounded-[5px] border-[#eee] flex justify-center items-center" > < BsSuitHeart /> </button>
                            <button className=" mx-2 h-[30px] w-[30px] bg-[#fff] border-[1px] border-solid rounded-[5px] border-[#eee] flex justify-center items-center"><BsEye /> </button>
                            <button className=" mx-2 h-[30px] w-[30px] bg-[#fff] border-[1px] border-solid rounded-[5px] border-[#eee] flex justify-center items-center"><BsCart /> </button>
                    </div>
                    <div className=" card-body border-t-[1px] ">
                            <h6 className="font-normal text-[#999] text-[14px] mb-[10px] leading-[1.2] capitalize">Tieu Thuyet</h6>
                            <Link to={`product/${product._id}`}>
                            <h2 className="font-normal text-[17px] h-[70px] pt-2  line-clamp-2 mb-[10px] leading-[28px] text-[#4b5966] capitalize hover:text-[#5caf90]">
                            {product.bookName}
                            </h2>
                            </Link>
                            <Rating name="half-rating-read mb-[10px]" defaultValue={product.rating} precision={0.5} readOnly />
                        <div> 
                            <span className="text-[#4b5966] text-[14px] font-bold mr-[7px]">{product.bookPrice}</span>
                            <span className="text-[14px] text-[#777] line-through mr-[7px]">7500</span>
                            <span className=" h-[30px] w-[30px]  text-[#eee] border-[1px] border-solid rounded-[5px] bg-red-500 ">25%</span>
                        </div>             
                    </div>
                </div>
            </div>
    </>
  )
}

export default Product