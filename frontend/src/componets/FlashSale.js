import React, {useMemo} from 'react'
import { useParams } from 'react-router-dom';
import { useGetProductsQuery } from '../slices/productsApiSlice';
import Loader from '../componets/Loader';
import banner1 from '../imageshome/banner1.jpg'
import Message from './Message';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import "swiper/css/grid";
import {Navigation, Grid  } from 'swiper/modules';
import { FaStar } from "react-icons/fa6";
import {BsCart ,BsSuitHeart,BsEye  } from 'react-icons/bs';
import Rating from '@mui/material/Rating';
const FlashSale = () => {
  
    const Deadline = Date.now() + 1000 * 60 * 60 * 24 * 10;
    const {pageNumber } = useParams()
    const {data , isLoading, error} = useGetProductsQuery({pageNumber});
    
 
   
  return (
    
    <>
    {isLoading ? (
        <Loader />
    ): error ? (<Message variant='danger'>{error?.data?.message || error.error}</Message>
    ) : (<>
        {/* <section className="my-8">
            <div className="container-sm">
                <div className="grid justify-items-center">
                    <div className="col-span-12 ">
                            <div className="flex flex-col">
                            <h3 className="font-[600] text-[#333333] text-[20px]  leading-[50px]  relative text-center">Sieu sale trong tuan</h3>
                            <div className="flex flex-row gap-4 w-full ">
                                <div className="">
                                    <span className='text-[50px]'>30</span>
                                    <span>day</span>
                                </div>
                                <div className="">
                                    <span className="text-[50px]">30</span>
                                    <span>phut</span>
                                </div>
                                <div className="">
                                    <span className="text-[50px]">30</span>
                                    <span>phut</span>
                                </div>
                            </div>
                            </div> 
                    </div>
                </div>
                <Swiper
                    slidesPerView={2}
                    loop= {'true'}
                    spaceBetween={30}
                  effect={'coverflow'}
                  grabCursor={true}
                  centeredSlides={true}
                
                  coverflowEffect={{
                    rotate: 0,
                    stretch: 0,
                    depth: 100,
                    modifier: 2.5,
                    slideShadows: true,
                  }}
                  autoplay={{
                    delay: 300,
                    disableOnInteraction: false,
                  }}
                    navigation={{
                      nextEl: '.swiper-button-next',
                      prevEl: '.swiper-button-prev',
                      clickable: true,
                    }}
                    modules={[EffectCoverflow, Navigation]}
                    className="mySwiper">
                 
                        {data.products.slice(0,10).map((product)=>(
                        <SwiperSlide>
                        <div className=" card flex flex-row border-[2px] w-[450px] ">
                            <div className="basis-[150px] "> 
                                <img src={product.bookImage} />
                            </div>
                            <div className="w-[calc(100%-150px)] basis-[calc(100%-150px)] pl-3">  */}
                                {/*  lan 2 <div className="flex flex-row ">
                                    <h6 className=" flex-auto flex justify-center items-center h-[40px] w-[40px] bg-[#a6c7f2] border-[1px] border-solid rounded-[5px] text-[#4c43cc] ">{product.category}</h6> 
                                    <span className=" flex-auto flex justify-center items-center h-[40px] w-[40px] ml-5 bg-[#c48d20]  border-[1px] border-solid rounded-[5px] text-[#f8e825] "><  FaStar style={style} />{product.rating} </span>
                                </div> */}
                                {/* <div className="flex flex-row ">
                                    <div className="basis-[100px] ">
                                        <h6 className="  flex justify-center items-center h-[40px] bg-[#a6c7f2] border-[1px] border-solid rounded-[5px] text-[#4c43cc] ">{product.category}</h6> 
                                    </div>
                                    <div className="basis-[100px] ">
                                        <span className="  flex justify-center items-center h-[40px] ml-5 bg-[#c48d20]  border-[1px] border-solid rounded-[5px] text-[#f8e825] "><  FaStar style={style} />{product.rating} </span>
                                    </div>
                                </div>
                                <h2 className="font-normal text-[25px] h-[40px] pt-2 line-clamp-2 mb-[3px] leading-[28px] text-[#050c13] capitalize hover:text-[#5caf90]">{product.bookName}</h2>
                                <h6 className="font-normal text-[14px]  truncate mb-[10px] leading-[28px] text-[#4b5966] capitalize">{product.author}</h6>
                                <div> 
                                    <span className="text-[#5c3dcc] text-[25px] font-bold mr-[7px]">{product.bookPrice}</span>
                                    <span className="text-[14px] text-[#777] line-through mr-[7px]">7500</span>
                                    <span className=" hh-[30px] w-[30px]  text-[#eee] border-[1px] border-solid rounded-[5px] bg-red-500 ">25%</span>
                                </div>
                            </div>
                        </div>
                    
                        </SwiperSlide>
                        ))}
                 
                    
                </Swiper>
            </div>
        </section> */}
        <section className="my-9">
            <div className="container-sm">
                <div className="row ">
                <div className="col-4 border-[2px] border-[#fff]">
                    <div className="mb-3 flex justify-center bg-[#f2f2f2]">
                        <h2 className=" text-[25px] font-semibold text-[#444] capitalize leading-[1]">SẢN PHẨM KHUYẾN MÃI</h2>
                    </div>
                    <Swiper className=" h-[590px]">
                    {data?.products?.map((product)=>(
                    <SwiperSlide>
                    <div className="flex flex-col border-[2px] group ">
                        <div className="flex justify-center my-2 relative">
                            <img className="max-h-[350px] w-[350px] rounded-[5px]" src={product.bookImage}/>
                        </div>
                        <span className=" text-[#eee]  left-[8px] top-[8px] border-[1px] border-solid rounded-[5px] bg-red-500 p-[4px] absolute ">25%</span>
                        <span className=" text-[#eee] top-[45px] left-[8px] border-[1px] border-solid rounded-[5px] bg-[#eeb900] p-[4px] absolute ">New</span>
                        <div className="flex absolute ml-3 opacity-0 left-[120px] top-[318px] group-hover:!opacity-[1]  transition-all ease-in-out duration-[0.3s] group-hover:-translate-y-1  items-center">
                            <button className=" mx-1 h-[40px] w-[40px] bg-[#fff] border-[1px] border-solid rounded-[5px] border-[#eee] flex justify-center items-center" > < BsSuitHeart /> </button>
                            <button className=" mx-1 h-[40px] w-[40px] bg-[#fff] border-[1px] border-solid rounded-[5px] border-[#eee] flex justify-center items-center"><BsEye /> </button>
                            <button className=" mx-1 h-[40px] w-[40px] bg-[#fff] border-[1px] border-solid rounded-[5px] border-[#eee] flex justify-center items-center"><BsCart /> </button>
                        </div>
                        <div>
                            <div className="flex justify-center">
                                    <div className="basis-[100px] ">
                                        <h6 className="  flex justify-center items-center h-[40px] bg-[#a6c7f2] border-[1px] border-solid rounded-[5px] text-[#4c43cc] ">{product.category}</h6> 
                                    </div>
                                    <div className="basis-[100px] flex items-center ml-3">
                                        <Rating name="half-rating-read " defaultValue={product.rating} precision={0.5} readOnly /> 
                                    </div>
                            </div>
                            <div className="flex justify-center">
                                <h2 className="font-normal text-[17px] w-[240px] h-[60px] pt-2  line-clamp-2 mb-[10px] leading-[28px] text-[#4b5966] capitalize hover:text-[#5caf90]">
                                    {product.bookName}
                                </h2>  
                            </div>
                            <div className="flex justify-center items-center gap-5 "> 
                                <span className="text-[#4b5966] text-[24px] font-bold  ">{product.bookPrice}</span>
                                <span className="text-[14px] text-[#777] line-through ">7500</span>
                            </div>   
                        </div>
                        <div className="flex justify-center mt-3">
                            <div className="flex flex-row gap-4 justify-center border-[1px] rounded-[2px] bg-[#fff] w-[250px]">
                                <div className="flex flex-col">
                                    <span>30</span>
                                    <span className="text-[20px]">Ngay</span>
                                </div>
                                <div className="flex flex-col">
                                    <span>30</span>
                                    <span className="text-[20px]">Gioi</span>
                                </div>
                                <div className="flex flex-col">
                                    <span>30</span>
                                    <span className="text-[20px]">Phut</span>
                                </div>
                                <div className="flex flex-col">
                                    <span>30</span>
                                    <span className="text-[20px]">Giay</span>
                            </div>
                    </div>
                    </div>
                    </div>
                  
                    </SwiperSlide>
                    ))}
                    </Swiper>
                    <div className>
                        <img className=" h-[100px]" src={banner1} /> 
                    </div>
                </div>
                <div className=" col-8">
                    <div className="mb-3 flex justify-center bg-[#f2f2f2]">
                        <h2 className=" text-[25px] font-semibold text-[#4b5966] capitalize leading-[1]">Sản Phẩm Nổi bật trong tuần</h2>
                    </div>
                    <div className="mb-5">
                        <Swiper
                          slidesPerView={2}
                          spaceBetween={20}
                          modules={[Navigation, Grid]}
                          grid={
                            {rows: 2, fill: 'row'}
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
                        {data?.products?.map((product)=>(
                        <SwiperSlide>
                        <div className=" flex border-[1px] group">
                            <div className="basis-[150px] relative"> 
                                <img src={product.bookImage} />
                            </div>
                            <span className=" text-[#eee]  left-[3px] top-[2px] border-[1px] border-solid rounded-[5px] bg-red-500 p-[4px] absolute ">25%</span>
                            <span className=" text-[#eee] top-[37px] left-[3px] border-[1px] border-solid rounded-[5px] bg-[#eeb900] p-[4px] absolute ">New</span>
                            <div className="flex flex-row absolute left-[20px] top-[80%]  opacity-0 group-hover:!opacity-[1]  transition-all ease-in-out duration-[0.3s] group-hover:-translate-y-1  items-center">
                                    <button className=" mx-1 h-[30px] w-[30px] bg-[#fff] border-[1px] border-solid rounded-[5px] border-[#eee] flex justify-center items-center" > < BsSuitHeart /> </button>
                                    <button className=" mx-1 h-[30px] w-[30px] bg-[#fff] border-[1px] border-solid rounded-[5px] border-[#eee] flex justify-center items-center"><BsEye /> </button>
                                    <button className=" mx-1 h-[30px] w-[30px] bg-[#fff] border-[1px] border-solid rounded-[5px] border-[#eee] flex justify-center items-center"><BsCart /> </button>
                            </div>
                            <div className="w-[calc(100%-150px)] basis-[calc(100%-150px)] pl-3">                 
                                <div className="flex flex-row ">
                                    <div className="basis-[100px] ">
                                        <h6 className="  flex justify-center items-center h-[40px] bg-[#a6c7f2] border-[1px] border-solid rounded-[5px] text-[#4c43cc] ">{product.category}</h6> 
                                    </div>
                                    <div className="basis-[100px] ">
                                        <span className="  flex justify-center items-center h-[40px] ml-5 bg-[#c48d20]  border-[1px] border-solid rounded-[5px] text-[#f8e825] "><  FaStar style={{ color:'#f8e825',fontSize:'21px', paddingRight: '3px'}} /> {product.rating} </span>
                                    </div>
                                </div>
                                <h2 className="font-normal text-[25px] h-[40px] pt-2 line-clamp-2 mb-[3px] leading-[28px] text-[#050c13] capitalize hover:text-[#5caf90]">{product.bookName}</h2>
                                <h6 className="font-normal text-[14px]  truncate mb-[10px] leading-[28px] text-[#4b5966] capitalize">{product.author}</h6>
                                <div className="flex  items-center"> 
                                <span className="text-[#4b5966] text-[24px] font-bold  ">{product.bookPrice}</span>

                                </div> 
                            </div>
                        </div>
                        </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>
                    <div className="mb-3 flex justify-center bg-[#f2f2f2]">
                        <h2 className=" text-[25px] font-semibold text-[#4b5966] capitalize leading-[1]">Dành cho bạn</h2>
                    </div>
                    <div>
                        <Swiper
                        slidesPerView={3}
                        spaceBetween={20}
                     
                        modules={[Navigation]}
                       
                        navigation={true}
                        style={
                          {
                            '--swiper-navigation-color': '#ff00ff',
                            '--swiper-pagination-color': '#ff00ff',
                          //   '--swiper-pagination-bullet-inactive-color': '#ff00ff',
                          }
                        }
                       >
                        {data.products.slice(0,10).map((product)=>(
                            <SwiperSlide>
                            <div className="flex flex-col group">
                                <div className=" flex justify-center relative">
                                    <img className="w-[150px] h-[150px]" src={product.bookImage} />
                                </div>
                                <span className=" text-[#eee]  left-[3px] top-[2px] border-[1px] border-solid rounded-[5px] bg-red-500 p-[4px] absolute ">25%</span>
                                <span className=" text-[#eee] top-[37px] left-[3px] border-[1px] border-solid rounded-[5px] bg-[#eeb900] p-[4px] absolute ">New</span>
                                <div className="flex absolute  flex-row top-[47%] left-[28%] opacity-0  group-hover:!opacity-[1]  transition-all ease-in-out duration-[0.3s] group-hover:-translate-y-1  items-center">
                                    <button className=" mx-1 h-[30px] w-[30px] bg-[#fff] border-[1px] border-solid rounded-[5px] border-[#eee] flex justify-center items-center" > < BsSuitHeart /> </button>
                                    <button className=" mx-1 h-[30px] w-[30px] bg-[#fff] border-[1px] border-solid rounded-[5px] border-[#eee] flex justify-center items-center"><BsEye /> </button>
                                    <button className=" mx-1 h-[30px] w-[30px] bg-[#fff] border-[1px] border-solid rounded-[5px] border-[#eee] flex justify-center items-center"><BsCart /> </button>
                                </div>
                                <div className="py-1"> 
                                    <h6 className="font-normal text-[#999] text-[14px] my-2  leading-[1.2] capitalize">{product.category}</h6>
                                    <h2 className="font-normal text-[17px] w-[250px] pt-1  line-clamp-1 mb-[5px] leading-[28px] text-[#4b5966] capitalize hover:text-[#5caf90]">
                                    {product.bookName}
                                    </h2>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="  flex justify-center text-[22px] items-center h-[40px] text-[#f52525] "><  FaStar style={{color:'#f8e825',fontSize:'25px', paddingRight: '3px'}} />{product.rating} </span>
                                    <span className="text-[#4b5966] text-[22px] font-bold  ">{product.bookPrice}</span>
                                    <span className="text-[14px] text-[#777] line-through  ">7500</span>
                                </div>
                            </div>    
                            </SwiperSlide> 
                        ))}
                        </Swiper>
                    </div>
                </div>
                </div>
            </div>
        </section>
        </>) }
        </>
  )
}

export default FlashSale