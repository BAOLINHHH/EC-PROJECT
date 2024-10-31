import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { useGetProductsQuery } from '../slices/productsApiSlice';
import Loader from '../componets/Loader';
import Rating from '@mui/material/Rating';
import { Link } from "react-router-dom"

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Grid, Autoplay } from 'swiper/modules'
import {BsCart ,BsSuitHeart,BsEye  } from 'react-icons/bs';
import listProducts from '../api/productsAPI';
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import "swiper/css/grid";
import ActionButton from './ActionButton';



const NewProduct = () => {
    // const {pageNumber } = useParams()
    
    const [loading,setLoading] = useState(true);
    const [dataProduct,setDataProduct] = useState('');
  
    const [colorCategory, setColorCategory] = useState(null);

    // const currentCategoryParam = searchParams.get("category") || "";
    // const [category, setCategory] = useState(currentCategoryParam);
    const [category, setCategory] = useState('');

    const arrcategories = [
        'Tiểu Thuyết',
        'Văn Học',
        'Thiếu Nhi',
        'Kinh Tế',
        'Ngôn Tình',
        'Tâm Lí',
        "Manga",
    ]
 
    useEffect (()=> {
        flechData()
    }, [category]);

    const flechData= async() =>{
        try {
            const responseProducts = await listProducts.getAllNewProducts(category);
            setDataProduct(responseProducts);
            setLoading(false);
        } catch (error) {  

        }
    }
    
    const setChangeCategory = (item)=>{
        setColorCategory(item);
        setCategory(item)
        // searchParams.set("category", item);
        // navigate({ search: searchParams.toString() });

    }

    // const {pageNumber } = useParams()
 
    // const {data , isLoading, error} = useGetProductsQuery();
    // const arrFitterCategory = []
    // for(let i=0;i<dataProduct?.length ;i++){
    //     arrFitterCategory.push(dataProduct[i].category)
    // }
    // const fitterCategory = [...new Set(arrFitterCategory)]
    console.log( "dataProduct",dataProduct)
  return (
    <>
    {loading ? (
        <Loader />
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
                            {arrcategories.map(item => (
                                <li className=" mr-[50px] text-[17px] capitalize leading-[28px] p-[4px] font-normal" onClick={()=> setChangeCategory(item)} 
                                style={{
                                cursor: 'pointer',
                                listStyleType: 'none',
                                color: colorCategory===item ? '#fff' : 'black',
                                border: colorCategory===item ? '1px solid white': '',
                                borderRadius: colorCategory===item ? '30px': '',
                                backgroundColor: colorCategory===item ? '#ff6162' : ''
                                }}
                                >{item} </li>
                            ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        
        { dataProduct.length>0 && <Swiper  
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
             <div className=" flex flex-wrap">
            { dataProduct?.map((item)=>( 
                <SwiperSlide key={item._id}>
                            <div className="card h-[430px]  group ">
                                <div className="flex justify-center">
                                    <Link to={ `/${item._id}`}>
                                    <img className="max-h-[210px] w-[210px]" src={item.bookImage}/>
                                    </Link>
                                </div>
                                <span className=" text-[#eee]  left-[8px] top-[8px] border-[1px] border-solid rounded-[5px] bg-red-500 p-[4px] absolute ">25%</span>
                                <span className=" text-[#eee] top-[45px] left-[8px] border-[1px] border-solid rounded-[5px] bg-[#eeb900] p-[4px] absolute ">New</span>
                               <ActionButton />
                            <div className="card-body border-t-[1px] ">
                                <h6 className="font-normal text-[#999] text-[14px] mb-[10px] leading-[1.2] capitalize">Tieu Thuyet</h6>
                                <Link to={`product/${item._id}`}>
                                <h2 className="font-normal text-[17px] h-[70px] pt-2  line-clamp-2 mb-[10px] leading-[28px] text-[#4b5966] capitalize hover:text-[#5caf90]">
                                {item.bookName}
                                </h2>
                                </Link>
                                <Rating name="half-rating-read mb-[10px]" defaultValue={item.rating} precision={0.5} readOnly />
                                <div> 
                                    <span className="text-[#4b5966] text-[18px] font-bold mr-[7px]">{item.bookPrice}</span>
                                    <span className="text-[14px] text-[#777] line-through mr-[7px]">7500</span>
                                </div>             
                            </div>
                            </div>
                  
                </SwiperSlide>
                
            ))}
            </div>
        </Swiper>}
        </div>
        
    </section>
        
        </>) }
        </>
  )
}

export default NewProduct