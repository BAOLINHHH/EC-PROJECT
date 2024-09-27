import React, { } from 'react'
import { useParams } from 'react-router-dom';
import { useGetProductsQuery } from '../slices/productsApiSlice';
import Loader from '../componets/Loader';
import Rating from '@mui/material/Rating';
import { Link } from "react-router-dom"
import Message from './Message';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Grid, Autoplay } from 'swiper/modules'
import {BsCart ,BsSuitHeart,BsEye  } from 'react-icons/bs';

import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import "swiper/css/grid";


const NewProduct = () => {
    const {pageNumber } = useParams()
    const {data , isLoading, error} = useGetProductsQuery({pageNumber});
  
    const arrFitterCategory = []
    for(let i=0;i<data?.products?.length ;i++){
        arrFitterCategory.push(data?.products[i]?.category)
    }
    const fitterCategory = [...new Set(arrFitterCategory)]
    console.log(fitterCategory)
  return (
    <>
    {isLoading ? (
        <Loader />
    ): error ? (<Message variant='danger'>{error?.data?.message || error.error}</Message>
    ) : (<>
     <section className="my-8">
        <div className="container-sm">
            <div className="row">
                <div className='col-12'>
                    <div className="flex flex-col mb-[19px] items-center">
                        <div className=" text-[25px] capitalize leading-[50px] font-normal text-[#333333]">
                            Sản Phẩm Mới
                        </div>
                        <div className="mt-3">
                            <ul className="flex flex-row ">   
                            {fitterCategory.map(item => (
                                <li className=" mr-[50px] text-[17px] capitalize leading-[28px] font-normal  ">{item} </li>
                            ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        <Swiper  
          slidesPerView={5}
          spaceBetween={20}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          modules={[Navigation, Pagination, Autoplay, Grid]}
          grid={
            {rows: 2, fill: 'row'}
          }
        //   pagination={{
        //     enabled: true,
        //     dynamicBullets: true,
        //   }}
          navigation={true}
          loop={true}
          style={
            {
              '--swiper-navigation-color': '#ff00ff',
              '--swiper-pagination-color': '#ff00ff',
            //   '--swiper-pagination-bullet-inactive-color': '#ff00ff',
            }
          }
           className="mySwiper"
        >
            {data?.products?.map((product, idx)=>( 
                <SwiperSlide key={idx}>
                    <div className=" flex flex-wrap">
                            <div className="card h-[430px]  group ">
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
                            <div className="card-body border-t-[1px] ">
                                <h6 className="font-normal text-[#999] text-[14px] mb-[10px] leading-[1.2] capitalize">Tieu Thuyet</h6>
                                <Link to={`product/${product._id}`}>
                                <h2 className="font-normal text-[17px] h-[70px] pt-2  line-clamp-2 mb-[10px] leading-[28px] text-[#4b5966] capitalize hover:text-[#5caf90]">
                                {product.bookName}
                                </h2>
                                </Link>
                                <div> 
                                    <Rating name="half-rating-read mb-[10px]" defaultValue={product.rating} precision={0.5} readOnly />
                                    <span className="text-[#4b5966] text-[14px] font-bold mr-[7px]">{product.bookPrice}</span>
                                    <span className="text-[14px] text-[#777] line-through mr-[7px]">7500</span>
                                    <span className=" h-[30px] w-[30px]  text-[#eee] border-[1px] border-solid rounded-[5px] bg-red-500 ">25%</span>
                                </div>             
                            </div>
                            </div>
                    </div>
                </SwiperSlide>
            ))}
        </Swiper>
        </div>
    </section>
        
        </>) }
        </>
  )
}

export default NewProduct