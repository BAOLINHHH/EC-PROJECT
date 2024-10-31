
import { Link } from "react-router-dom"
import Rating from '@mui/material/Rating';
import {BsCart ,BsSuitHeart,BsEye  } from 'react-icons/bs';
import { optionCurrency,transform } from "./money"
const Product = ({product}) => {
  console.log("producttop", product)
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
             <div className="flex items-center bg-[#ffffff] border-[1px] border-solid border-[#eee] p-[15px] mb-3 group">
                            <div className="basis-[100px]"> 
                                <img  src={product.bookImage} />
                            </div>
                            <span className=" text-[#eee] top-[3%] left-[1%] border-[1px] border-solid rounded-[5px] bg-[#eeb900] p-[4px] absolute ">New</span>
                            <div className=" w-[calc(100%-100px)] basis-[calc(100%-100px)] pl-3">
                                <Rating name="half-rating-read mb-[10px]" defaultValue={product.rating} precision={0.5} readOnly />
                                <h2 className="font-normal  text-[17px] mb-[10px] truncate  leading-[28px] text-[#4b5966] capitalize hover:text-[#5caf90] ">{product.bookName}</h2>
                                <h6 className="font-normal text-[#999] text-[14px] mb-[9px] leading-[1.2] capitalize">{product.category.categoryName}</h6>
                                <div className="mb-2 ">
                                    <span className="text-[#4b5966] text-[18px] font-bold mr-[10px]">{product.bookPrice}</span>
                                    <span className="text-[14px] text-[#777] line-through mr-[10px]">7500</span>
                                    <span className=" text-[#eee] border-[1px] border-solid rounded-[5px] bg-red-500 p-[4px] ">25%</span>
                                </div>  
                                <div className="flex flex-row  opacity-0 group-hover:!opacity-[1]  transition-all ease-in-out duration-[0.3s] group-hover:-translate-y-1  items-center">
                                    <button className=" mx-2 h-[30px] w-[30px] bg-[#fff] border-[1px] border-solid rounded-[5px] border-[#eee] flex justify-center items-center" > < BsSuitHeart /> </button>
                                    <button className=" mx-2 h-[30px] w-[30px] bg-[#fff] border-[1px] border-solid rounded-[5px] border-[#eee] flex justify-center items-center"><BsEye /> </button>
                                    <button className=" mx-2 h-[30px] w-[30px] bg-[#fff] border-[1px] border-solid rounded-[5px] border-[#eee] flex justify-center items-center"><BsCart /> </button>
                                </div>
                            </div>
            </div>
    </>
  )
}

export default Product