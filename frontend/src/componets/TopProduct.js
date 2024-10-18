import React, { useEffect, useState } from 'react'
import Message from './Message';
import Loader from '../componets/Loader';
import { useParams } from 'react-router-dom';
import { useGetProductsQuery } from '../slices/productsApiSlice';
import Product from "../componets/Product";
import 'swiper/css';
import 'swiper/css/navigation';
import "swiper/css/grid";
import { Swiper, SwiperSlide } from 'swiper/react';
import {Navigation, Grid  } from 'swiper/modules';
import {BsCart ,BsSuitHeart,BsEye  } from 'react-icons/bs';
import listProducts from '../api/productsAPI';
const TopProduct = () => {
    const {pageNumber } = useParams()
    const {data , isLoading, error} = useGetProductsQuery({pageNumber});

    const [loading,setLoading] = useState(true);
    const [dataProduct,setDataProduct] = useState([]);


    useEffect (()=> {
        flechData()
    }, []);

    const flechData =async () =>{
        try {
            const responseProducts = await listProducts.getTopRatedProducts()
            setDataProduct(responseProducts)
            setLoading(false)
          } catch (error) {
          }
    }

  return (
    <>
    {loading ? (
        <Loader />
    ) : (<>
    <section>
        <div className="container-sm">
            <div className="row">
                    <div className="col-4">
                        <div className="w-full  py-[10px] bg-[#f2f2f2]">
                            <h2 className=" text-[25px] font-semibold text-[#4b5966]   capitalize leading-[1]">Combo</h2>
                        </div>
                        {dataProduct.length>0 && <Swiper 
                            slidesPerView={1}
                            paceBetween={20}
        
                            modules={[Navigation, Grid]}
                            grid={
                            {rows: 3, fill: 'row'}
                            }
                            navigation={true}
                            style={
                            {
                                '--swiper-navigation-color': '#ff00ff',
                                '--swiper-pagination-color': '#ff00ff',
                            //   '--swiper-pagination-bullet-inactive-color': '#ff00ff',
                            }
                            }
                        >
                        {dataProduct.map((product)=>(
                        <SwiperSlide> 
                            < Product  product={product}/>
                        {/* <div className="flex flex-row items-center bg-[#ffffff] border-[1px] border-solid border-[#eee] p-[15px] mb-3 group">
                            <div className="basis-[100px]"> 
                                <img  src={product.bookImage} />
                            </div>
                            <div className=" w-[calc(100%-100px)] basis-[calc(100%-100px)]">
                                <h2 className="font-normal  text-[17px] truncate mb-[10px] leading-[28px] text-[#4b5966] capitalize hover:text-[#5caf90] ">{product.bookName}</h2>
                                <h6 className="font-normal text-[#999] text-[14px] mb-[10px] leading-[1.2] capitalize">Tieu Thuyet</h6>
                                <div className="mb-2">
                                    <span className="text-[#4b5966] text-[18px] font-bold mr-[7px]">{product.bookPrice}</span>
                                    <span className="text-[14px] text-[#777] line-through mr-[7px]">7500</span>
                                    <span className=" text-[#eee] border-[1px] border-solid rounded-[5px] bg-red-500 p-[4px] ">25%</span>
                                </div>
                                <div className="flex flex-row  opacity-0 group-hover:!opacity-[1]  transition-all ease-in-out duration-[0.3s] group-hover:-translate-y-1  items-center">
                                    <button className=" mx-2 h-[30px] w-[30px] bg-[#fff] border-[1px] border-solid rounded-[5px] border-[#eee] flex justify-center items-center" > < BsSuitHeart /> </button>
                                    <button className=" mx-2 h-[30px] w-[30px] bg-[#fff] border-[1px] border-solid rounded-[5px] border-[#eee] flex justify-center items-center"><BsEye /> </button>
                                    <button className=" mx-2 h-[30px] w-[30px] bg-[#fff] border-[1px] border-solid rounded-[5px] border-[#eee] flex justify-center items-center"><BsCart /> </button>
                                </div>
                            </div>
                        </div> */}
                        </SwiperSlide>
                        ))}
                        </Swiper>}
                    </div>
                    <div className="col-4">
                        <div className="w-full py-[10px] bg-[#f2f2f2] ">
                            <h2 className=" text-[25px] font-semibold text-[#4b5966]  capitalize leading-[1]">Ebook</h2>
                        </div>
                        { dataProduct.length>0 && <Swiper
                         slidesPerView={1}
                         paceBetween={20}
          
                         modules={[Navigation, Grid]}
                         grid={
                         {rows: 3, fill: 'row'}
                         }
                         navigation={true}
                         style={
                         {
                             '--swiper-navigation-color': '#ff00ff',
                             '--swiper-pagination-color': '#ff00ff',
                         //   '--swiper-pagination-bullet-inactive-color': '#ff00ff',
                         }
                         }
                        
                        >
                        {dataProduct.slice(0,10).map((product)=>(
                        <SwiperSlide> 
                            < Product  product={product}/>
                        {/* <div className="flex flex-row items-center bg-[#ffffff] border-[1px] border-solid border-[#eee] p-[15px] mb-3 group">
                            <div className="basis-[100px]"> 
                                <img  src={product.bookImage} />
                            </div>
                            <div className=" w-[calc(100%-100px)] basis-[calc(100%-100px)]">
                                <h2 className="font-normal  text-[17px] truncate mb-[10px] leading-[28px] text-[#4b5966] capitalize hover:text-[#5caf90] ">{product.bookName}</h2>
                                <h6 className="font-normal text-[#999] text-[14px] mb-[10px] leading-[1.2] capitalize">Tieu Thuyet</h6>
                                <div className="mb-2">
                                    <span className="text-[#4b5966] text-[18px] font-bold mr-[7px]">{product.bookPrice}</span>
                                    <span className="text-[14px] text-[#777] line-through mr-[7px]">7500</span>
                                    <span className=" text-[#eee] border-[1px] border-solid rounded-[5px] bg-red-500 p-[4px] ">25%</span>
                                </div>
                                <div className="flex flex-row  opacity-0 group-hover:!opacity-[1]  transition-all ease-in-out duration-[0.3s] group-hover:-translate-y-1  items-center">
                                    <button className=" mx-2 h-[30px] w-[30px] bg-[#fff] border-[1px] border-solid rounded-[5px] border-[#eee] flex justify-center items-center" > < BsSuitHeart /> </button>
                                    <button className=" mx-2 h-[30px] w-[30px] bg-[#fff] border-[1px] border-solid rounded-[5px] border-[#eee] flex justify-center items-center"><BsEye /> </button>
                                    <button className=" mx-2 h-[30px] w-[30px] bg-[#fff] border-[1px] border-solid rounded-[5px] border-[#eee] flex justify-center items-center"><BsCart /> </button>
                                </div>
                            </div>
                        </div> */}
                        </SwiperSlide>
                        ))}
                        </Swiper>}
                    </div>
                    <div className="col-4">
                        < div className="w-full py-[10px] bg-[#f2f2f2]">
                            <h2 className=" text-[25px] font-semibold text-[#4b5966] capitalize leading-[1]">Sản phẩm được đánh giá cao</h2>
                        </div>
                        { dataProduct.length>0 && <Swiper
                        slidesPerView={1}
                        paceBetween={20}
                        modules={[Navigation, Grid]}
                        grid={
                        {rows: 3, fill: 'row'}
                        }
                        navigation={true}
                        style={
                        {
                            '--swiper-navigation-color': '#ff00ff',
                            '--swiper-pagination-color': '#ff00ff',
                        //   '--swiper-pagination-bullet-inactive-color': '#ff00ff',
                        }
                        }
                        >
                        {dataProduct.map((product)=>(
                        <SwiperSlide> 
                          < Product  product={product}/>
                        </SwiperSlide>
                        ))}
                        </Swiper>}
                    </div>
            </div>
        </div>
    </section>
    </>) }
    </>
  )
}

export default TopProduct